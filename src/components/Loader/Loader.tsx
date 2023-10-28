import { Spinner } from "react-bootstrap"


const loader = () => {
  return (
    <div className="loader">
        <Spinner animation="border" variant="info" className="loader-spinner">
        </Spinner>
    </div>
  )
}

export default loader