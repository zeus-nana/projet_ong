import { BrowserRouter } from 'react-router-dom'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import Views from '@/views'
import AuthInitializer from '@/auth/AuthInitializer'
import appConfig from './configs/app.config'
import './locales'

if (appConfig.enableMock) {
    import('./mock')
}

function App() {
    return (
        <Theme>
            <BrowserRouter>
                <AuthInitializer>
                    <Layout>
                        <Views />
                    </Layout>
                </AuthInitializer>
            </BrowserRouter>
        </Theme>
    )
}

export default App
