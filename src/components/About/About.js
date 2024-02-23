import React from 'react'
import AboutStyles from '../../modules/About.module.scss'
import Login from '../Login/Login';

export default function About() {
    return (
        <div className={`row mb-5 ${AboutStyles.about} `}>
            <h1 className={`${AboutStyles.aboutHeader} mb-5 col-lg-12`}>LearnProgramming</h1>
            <p class={'abouts-text'}>LearnProgramming to platforma edukacyjna, która umożliwia użytkownikom naukę programowania w sposób interaktywny i przyjazny dla użytkownika. Nasza aplikacja oferuje szeroki zakres kursów z różnych dziedzin programowania, takich jak Java, Python, JavaScript, C i wiele innych.</p>
            <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 p-0'>
                <img className={`${AboutStyles.aboutPhoto} mb-3`} src='https://www.springboard.com/blog/wp-content/uploads/2021/12/Free-Online-Coding-Classes-2022-Beginner-Guide.jpg' />
            </div>
            <div className={`col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 p-0 ${AboutStyles.aboutText}`}>

                <p>
                Naszym celem jest umożliwienie każdemu na zdobycie nowych umiejętności programistycznych w sposób dostępny, przystępny i skuteczny.
                 Chcemy inspirować i wspierać naszych użytkowników w ich podróży ku doskonałości w dziedzinie programowania.
                </p>
                <div className={AboutStyles.join}>
                    <Login></Login>
                </div>
            </div>

        </div>
    )
}
