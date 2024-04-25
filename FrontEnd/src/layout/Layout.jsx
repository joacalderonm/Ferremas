import PropTypes from 'prop-types'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'


export function Layout ({ children }) {
    return(
        <>
            <Header/>
            <main className='p-4'>
                {children}

            </main>                
            <Footer/>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
  };