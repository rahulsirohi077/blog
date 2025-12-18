import type { SignupInput } from "@rahulsirohi077/medium-common";
import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URl } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });

    const sendRequest = async () => {
        try {
            const response = await axios.post(
                `${BACKEND_URl}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
                postInputs
            );
            const jwt = response.data?.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (error) {
            console.log(error);
            alert((error as Error).message);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <div className="flex flex-col">
                <div className="px-10">
                    <div className="text-3xl font-extrabold">Create an Account</div>
                    <div className="text-slate-400">
                        {type === "signin"
                            ? "Don't have an account?"
                            : "Already have an account?"}
                        <Link
                            className="pl-2 underline"
                            to={type === "signin" ? "/signup" : "/signin"}
                        >
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                {type === "signup" ? (
                    <LabelledInput
                        label="Name"
                        placeholder="John Doe..."
                        onChange={(e) => {
                            setPostInputs((c) => ({
                                ...c,
                                name: e.target.value,
                            }));
                        }}
                    />
                ) : null}
                <LabelledInput
                    label="Email"
                    placeholder="example@gmail.com"
                    onChange={(e) => {
                        setPostInputs((c) => ({
                            ...c,
                            email: e.target.value,
                        }));
                    }}
                />
                <LabelledInput
                    label="Password"
                    type="password"
                    placeholder="Password1234"
                    onChange={(e) => {
                        setPostInputs((c) => ({
                            ...c,
                            password: e.target.value,
                        }));
                    }}
                />
                <button
                    onClick={sendRequest}
                    type="button"
                    className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    {type === "signup" ? "Sign up" : "Sign in"}
                </button>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({
    label,
    placeholder,
    onChange,
    type,
}: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
