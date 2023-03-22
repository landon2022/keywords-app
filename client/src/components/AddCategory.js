import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import Button from "./Button";
import ProcesingButton from "./ProcesingButton";
// import swal from 'sweetalert';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function AddCategory(props) {
    const MySwal = withReactContent(Swal)
    const { register, handleSubmit } = useForm();
    const [form, setForm] = useState({
        category: "",
        keywords: ""
    })
    const [button, setButton] = useState();

    // const navigate = useNavigate();

    async function onSubmit(data) {
        setButton(<ProcesingButton className="btn btn-primary" text={"Saving"} />)

        const newCategory = {
            // ...form
            category: data.category,
            keywords: data.keywords
        }
        console.log(newCategory);
        let response = await fetch("http://localhost:5000/addcategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategory)
        })
        let result = await response.json()
        console.log(result);
        if (result === "Success") {
            setButton(<Button className="btn btn-primary" onClick={handleSubmit(onSubmit)} text={"Save"} buttonState={props.buttonState} />)
            setForm({
                category: "",
                keywords: ""
            })
            MySwal.fire("Great!", "The new category and keywords have been successfully added. Thanks for your contribution!", "success").then(() => props.handleCategoryUpdate())



        }
    }

    function updateForm(value) {
        return setForm(prev => {
            return { ...prev, ...value }
        })
    }

    useEffect(() => {
        setButton(<Button className="btn btn-primary" onClick={handleSubmit(onSubmit)} text={"Save"} buttonState={props.buttonState} />)
    }, [props.buttonState])
    return (
        <div className="col col-lg-2  custom2 ">
            <div className="d-grid gap-2 mx-auto custom ">
                <button
                    type="button"
                    className="btn btn-secondary text-nowrap"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@getbootstrap"
                >
                    <span style={{ fontSize: "90%" }}>Add New Category &#160; </span>

                </button>

                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Category</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>

                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">
                                            Category Name:
                                        </label>
                                        <input
                                            {...register("category", { required: true, maxLength: 20, onChange: (e) => updateForm({ category: e.target.value }) })}
                                            value={form.category}
                                            type="text"
                                            className="form-control"
                                            id="recipient-name" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">
                                            Keywords:
                                        </label>
                                        <textarea
                                            {...register("keywords", { required: true, onChange: (e) => updateForm({ keywords: e.target.value }) })}
                                            value={form.keywords}
                                            className="form-control"
                                            id="message-text"
                                        // defaultValue={""}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"

                                >
                                    Cancel
                                </button>
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}