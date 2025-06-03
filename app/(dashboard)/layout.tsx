function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col w-full h-screen">
            <div className="w-full">{children}</div>
        </div>
    );
}

export default layout;
