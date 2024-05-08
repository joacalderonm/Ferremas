import PropTypes from 'prop-types'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'


function Layout({ children }) {
    return(
        <>
            <Header/>
            <main className='md:container md:mx-auto p-4'>
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
