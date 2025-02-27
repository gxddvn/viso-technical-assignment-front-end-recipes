import { motion } from "framer-motion";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
            <motion.div
                className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <p className="mt-2 text-blue-500 text-sm">Loading...</p>
        </div>
    );
}

export default Loading