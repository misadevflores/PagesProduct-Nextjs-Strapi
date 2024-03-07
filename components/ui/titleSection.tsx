export interface ITitle {
    title:    string;
    subtitle: string;
}


const TitleSection = ({title = "Title", subtitle = "Subtitle"}: ITitle) => {
    return (
        <div className="flex flex-col items-center mb-4">
            <span className="text-3xl xl:text-4xl text-sky-900 uppercase">{title}</span>
            <span className="text-3xl xl:text-4xl font-extrabold text-sky-900 uppercase">{subtitle}</span>
        </div>
    )
}

export default TitleSection;