// import style from './MainLayout.module.scss';
import Header from '../components/Header';

function MainLayout({children}){


    return(
        <>
            <Header/>
            <div /*className={style('container')}*/>
                <div /*className={style('content')}*/>
                    {children}
                </div>
            </div>
        </>
        
    );
}

export default MainLayout;