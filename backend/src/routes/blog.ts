import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@rahulsirohi077/medium-common";

type JWTPayload = {
    id: string;
};

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

blogRouter.use(async (c, next) => {
    // get the header
    const AuthHeader = c.req.header("Authorization") || "";
    try {
        // verify the header
        const response = (await verify(
            AuthHeader.split(" ")[1],
            c.env.JWT_SECRET
        )) as JWTPayload;
        // if the header is correct, we need to proceed
        if (response) {
            const id = response.id;
            c.set("userId", id);
            await next();
        } else {
            // if not, we return the user a 404 status code
            c.status(403);
            return c.json({
                error: "Unauthorized",
            });
        }
    } catch (error) {
        c.status(403);
        return c.json({
            error: "Unauthorized",
        });
    }
});

blogRouter.post("/", async (c) => {
    const userId = c.get("userId");
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:'Inputs are not correct'
        })
    }
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
            },
        });
        return c.json({
            id: blog.id,
        });
    } catch (error) {
        c.status(411);
        return c.json({
            message: "error while creating the post",
        });
    }
});

blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:'Inputs are not correct'
        })
    }
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            },
        });
        return c.json({
            id: blog.id,
        });
    } catch (error) {
        c.status(411);
        return c.json({
            message: "error while updating the post",
        });
    }
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const posts = await prisma.post.findMany({
            select:{
                id:true,
                content:true,
                title:true,
                author:{
                    select: {
                        name:true
                    }
                }
            }
        });
        return c.json({
            posts,
        });
    } catch (error) {
        c.status(403);
        return c.json({
            message: "Error while Fetching the posts",
        });
    }
});

blogRouter.get("/:id", async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id,
            },
            select: {
                id:true,
                title:true,
                content:true,
                author: {
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({
            post: blog
        })
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Error While fetching the post",
        });
    }
});
