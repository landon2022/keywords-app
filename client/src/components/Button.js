export default function Button(props) {

    return (
        <button type="submit" onClick={props.onClick} className={props.className} disabled={props.buttonState}>
            {props.text}
        </button>
    )
}