interface ITitleBorder {
    title: string
}
const TitleBorder = ({title}: ITitleBorder) => <div className="my-6 relative">
    <h2 className="absolute lg:text-4xl xl:text-4xl font-extrabold text-primary tracking-tight text-2xl sm:text-2xl md:text-[35px]   bg-white dark:bg-inherit dark:text-white pr-3 uppercase">
    {title}
</h2>
<div className="border-b-2 h-8 border-primary dark:h-9"></div>
</div>

export default TitleBorder