import Styles from './Credits.module.css';
const Credits = () => {
    let name = "AYUSH KUMAR";
    name = name.split('').map((item, index) => <div key={index}>{item}</div>);
    return (
        <div className={Styles.credits}>
            <span>Designed  & Developed with <div className={Styles.heart}>❤️</div> by </span>
            <a rel="noreferrer" target="blank" href="https://ayush15.netlify.app">{name}</a> 
        </div>
    )
}
export default Credits;