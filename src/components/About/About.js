import React from 'react'
import './About.css';
import Login from '../Login/Login';
export default function About() {
    return (
        <div className='row mb-5 about '>
            <div className='col-lg-6 col-md p-0'>
                <h1 className='header-ab'>LearnProgramming</h1>
                <p className='text-ab mt-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula vestibulum sollicitudin. Integer sit amet augue sit amet est volutpat pharetra sed ut dolor. Proin dictum nisi eget nisi mollis, a tincidunt erat consequat. Nulla quis euismod sapien, ut varius metus. Morbi ac finibus diam, a iaculis lectus. Sed in vehicula odio. Donec elementum pretium diam, a sollicitudin sapien egestas vitae. Cras malesuada fermentum est ac porttitor. Maecenas varius, nibh vel hendrerit lacinia, nibh dui congue lectus, maximus rutrum lorem purus sed magna.
                </p>
                <Login></Login>
            </div>
            <div className='col-lg-6 col-md p-0'>
                <img className='photo-ab' src='https://www.springboard.com/blog/wp-content/uploads/2021/12/Free-Online-Coding-Classes-2022-Beginner-Guide.jpg' />
            </div>
        </div>
    )
}
