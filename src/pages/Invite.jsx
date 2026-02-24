import {useParams, useNavigate} from "react-router-dom"
import {motion} from "framer-motion"
import {useEffect, useState} from "react";
import {saveName} from "../utils/session.js";

const invites = {
    "julia": {
        name: "Юля",
    },
    "ksenia": {
        name: "Ксюша",
    },
}

export default function Invite() {
    const {slug} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const invite = invites[slug]

    useEffect(() => {
        if (slug) localStorage.setItem("spa_mission:slug", slug)
    }, [slug])

    if (!invite) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">Запрошення не знайдено</h2>
            </div>
        )
    }

    const handleStart = () => {
        setLoading(true)
        saveName(invite.name)
        setTimeout(() => {
            navigate("/quest", {state: {name: invite.name}})
        }, 1000)
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0}}
            className="text-center space-y-6"
    >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Секретне запрошення
            </h1>
            <p className="text-purple-200">
                Для: <span className="font-semibold">{invite.name}</span>
                &nbsp;
                <snap className="text-xl">
                    💌
                </snap>
            </p>

            <p>
                Виявлено перевантаження системи.
                Необхідна термінова діагностика....
            </p>

            <button
                onClick={handleStart}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"            >
                <div className="flex justify-center items-center gap-3">
                    {loading &&
                        <div className="h-6 w-6 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"/>
                    }
                    Почати
                </div>
            </button>
        </motion.div>
    )
}
