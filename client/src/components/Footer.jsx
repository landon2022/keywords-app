import HoverPopUP from "./HoverPopUP";

export default function Footer({ imgData }) {
  const year = new Date().getFullYear();
  return (

    <div className="container fixed-bottom">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 " id="footer">
        <div className="col-md-4 d-flex align-items-center copyright">

          <span className="mb-3 mb-md-0 text-muted">© {year} APAC</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex contact">
          <li className="ms-3">
            <a className="text-muted" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/lin-chen-b2162521a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUeB2STUwShmMWsveX7SGZA%3D%3D">
              <i className="social-icon fab fa-linkedin"></i>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" target="_blank" rel="noreferrer" href="https://twitter.com/lc81117740">
              <i className="social-icon fab fa-twitter"></i>
            </a>
          </li>
          <li className="ms-3 ">
            <a className="text-muted" target="_blank" rel="noreferrer" href="mailto:2909852565c@gmail.com">
              <i className="social-icon fas fa-envelope "></i>
            </a>
          </li>
        </ul>
      </footer>
      <HoverPopUP imgData={imgData} />
    </div>



  )
}