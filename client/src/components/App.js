import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import ClipboardJS from "clipboard/dist/clipboard";
import Header from "./Header";
import Footer from "./Footer";
import { CategoryList } from "./CategoryList";
import HoverPopup from "./HoverPopUP";
import "bootstrap-icons/font/bootstrap-icons.css"

new ClipboardJS(".btn-category")

function App() {

  const [buttonState, setButtonState] = useState(true)
  const [data, setData] = useState()
  // // const [updated, setUpdated] = useState(false)
  // async function getData() {
  //   const response = await fetch("http://localhost:5000/records");
  //   const result = await response.json();
  //   setData(result)
  // }

  async function getBingImage() {
    const response = await fetch("http://localhost:5000/backgroundImage");
    const imgData = await response.json();
    const imgURL = "https://www.bing.com" + imgData.images[0].url;
    document.body.style.backgroundImage = `url(${imgURL})`
    setData(imgData.images[0])
  }
  useEffect(() => {
    getBingImage();
  }, [])

  // function handleUpdate() {
  //   console.log("checkupdate");
  //   // window.location.reload()
  //   setUpdated(!updated)
  // }
  function handleButtonState(event) {
    setButtonState(!event.target.checked)

  }

  return (
    <div className="main-container" data-bs-theme="dark">
      <Header handleButtonState={handleButtonState} buttonState={buttonState} />
      <CategoryList buttonState={buttonState} />
      <Footer imgData={data} />
    </div>
  );
}

export default App;
