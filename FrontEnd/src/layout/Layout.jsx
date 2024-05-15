import PropTypes from 'prop-types'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'


function Layout({ children }) {
    return(
        <>
            <Header/>
            <main className=''>
                {children}

            </main>                
            <Footer/>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
  };
  
export default Layout;
