import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import { Form } from "./component/Form/Form"
import { UserList } from "./component/List/UserList";
import { Product } from "./component/Product/Product";

function  App(){
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Form/>}/>
        <Route path="/list" element={<UserList/>}/>
        <Route path="/product" element={<Product/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
