import Swal from 'sweetalert2'
import { useState } from "react"


export default function Headers(props) {
  const [isChecked, setIsChecked] = useState(false)

  function handleEdit(e) {
    function checkPasscode(event) {
      if (event.target.checked) {
        Swal.fire({
          title: 'Please enter the passcode',
          input: 'password',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            console.log(process.env.REACT_APP_PASSCODE);
            if (result.value === process.env.REACT_APP_PASSCODE) {
              Swal.fire("Great! You have entered the edit mode.").then(() => { props.handleButtonState(event) })
            } else {
              Swal.fire("Sorry! Something wrong with the passcode, Please try again.").then(() => { setIsChecked(!event.target.checked); })
            }
          } else {
            setIsChecked(!event.target.checked)
          }

        })

      } else {
        props.handleButtonState(event)
      }
    }
    checkPasscode(e)

  }

  function handleBackground(event) {
    console.log(event.target.checked);
  }

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-transparent">
      <div className="container-fluid nav-custom">
        <a className="navbar-brand brand-text" href="#">
          Profiling Keywords
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://app.gather.town/app/Pk5DrVBj3OSRIktL/APAC%20TEAM" target="_blank" rel="noreferrer">
                Gather
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link " target="_blank" rel="noreferrer" href="#">Tutorial</a>
            </li>
            <li className="nav-item">
              <a className="nav-link " target="_blank" rel="noreferrer" href="#">BaseData</a>
            </li>
          </ul>

          <div className="dropdown">
            <button
              type="button"
              className="btn btn-white"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"

            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <form className="dropdown-menu  dropdown-menu-end settings" >

              <ul className="dropdown-menu dropdown-menu-end d-block position-static mx-0 shadow w-220px">
                <h5>Settings</h5>
                <hr className="dropdown-divider" />
                <li>
                  <a className="dropdown-item d-flex gap-2 align-items-center" href="#">

                    <div className="d-flex">
                      <span>Edit Mode</span>
                      <div className="form-switch form-check ms-2 check-item">
                        <input type="checkbox" className="form-check-input" id="edit-mode" onClick={handleEdit} checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
                        <label htmlFor="edit-mode" className="form-check-label">
                          on
                        </label>
                      </div>
                    </div>
                  </a>
                </li>

                <li>
                  <a className="dropdown-item d-flex gap-2 align-items-center" href="#">
                    Feedback
                  </a>
                </li>
                <li>
                  <a className="dropdown-item d-flex gap-2 align-items-center" href="#">
                    Help
                  </a>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item dropdown-item-danger d-flex gap-2 align-items-center"
                    href="#"
                  >

                    About
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>

    </nav>

  )
}