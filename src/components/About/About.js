import React from 'react'
import './About.css';
import Login from '../Login/Login';
export default function About() {
    return (
        <div className='row mb-5 about '>
            <h1 className='header-ab mb-5 col-lg-12'>LearnProgramming</h1>
            <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 p-0'>
                <img className='photo-ab mb-3' src='https://www.springboard.com/blog/wp-content/uploads/2021/12/Free-Online-Coding-Classes-2022-Beginner-Guide.jpg' />
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 p-0 about-text'>

                <p className='text-ab'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula vestibulum sollicitudin. Integer sit amet augue sit amet est volutpat pharetra sed ut dolor. Proin dictum nisi eget nisi mollis, a tincidunt erat consequat. Nulla quis euismod sapien, ut varius metus. Morbi ac finibus diam, a iaculis lectus. Sed in vehicula odio. Donec elementum pretium diam, a sollicitudin sapien egestas vitae. Cras malesuada fermentum est ac porttitor. Maecenas varius, nibh vel hendrerit lacinia, nibh dui congue lectus, maximus rutrum lorem purus sed magna.
                </p>
                <div className='join'>
                    <Login></Login>
                </div>
            </div>

        </div>
    )
}
