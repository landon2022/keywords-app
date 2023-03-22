import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default function ConfirmAlert() {
    const submit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('Click Yes')
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };
    return (
        <div className='container'>
            <button onClick={submit}> OK </button>
        </div>
    )
}

export const finishAlert = (title, message, label) => {
    confirmAlert({
        title: title,
        message: message,
        buttons: [
            {
                label: label,
                onClick: () => { }
            },
        ]
    });
}
