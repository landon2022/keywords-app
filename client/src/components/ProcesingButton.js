export default function ProcesingButton(props) {
    return (
        <button className={props.className} type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {props.text}
        </button>
    )
}