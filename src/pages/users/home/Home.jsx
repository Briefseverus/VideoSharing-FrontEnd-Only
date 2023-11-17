import { Col, Container, Row } from "react-bootstrap"
import Cards from "../../../Components/user/cards/Cards"
import Carousels from "../../../Components/user/carousels/Carousels"
import VideoUpload from "../../../Components/user/uploadVideo/VideoUpload "
import Sidebar from '../../../Components/slideBar/Sidebar'

const Home = () => {
    return (
        <div>
           <Container fluid>
                <Row>
                    <Col sm={2}><Sidebar/> </Col>
                    <Col sm={10}><Cards /></Col>
                </Row>
            </Container>
        </div>
    )
}
export default Home