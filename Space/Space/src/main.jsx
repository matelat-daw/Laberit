import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import Index from './Index';
import Layout from './Layout';
// import Create from './Views/Create';
import Read from './Views/Read';
// import Details from './Views/Details';
// import Delete from './Views/Delete';

createRoot(document.getElementById('root')).render(
    <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Index />}></Route>
                {/* <Route path="/create" element={<Create />} /> */}
                <Route path="/read" element={<Read />} />
                {/* <Route path="/details/:id" element={<Details />} />
                <Route path="/create/:id" element={<Create />} />
                <Route path="/delete/:id" element={<Delete />} /> */}
                <Route path="*" element={<Navigate to="/" replace="true"/>}></Route>
            </Route>
        </Routes>
    </Router>
  );