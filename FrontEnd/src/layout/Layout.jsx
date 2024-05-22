import PropTypes from 'prop-types'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'


function Layout({ children }) {
    return(
        <div className='flex flex-col min-h-screen'>
            <Header/>
            <main className='flex-grow'>
                {children}

            </main>                
            <Footer/>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
  };
  
export default Layout;
