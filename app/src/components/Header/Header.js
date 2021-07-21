import React from 'react';
import youtubeUrl from 'youtube-url';

import './Header.css';


const Header = () => {
    return (
        <header>
            <nav>
                <h3 className='nav-header'><a href='/'>YoutubeToMp3</a></h3>
            </nav>
            <section className='first-section'>
                <h1>Youtube To Mp3 Converter</h1>
                <div className='inputs'>
                    <input id='url' type="text" placeholder='Paste Link Here'></input>
                    <input type="button" onClick={onType} value="Convert"></input>
                    <div className='load-place'></div>
                    <div className='invisible' id='loader'>
                        <div className='loader' ></div>
                        <h4>Waiting to downnload</h4>
                    </div>
                </div>
            </section>

        </header>
    );
}

const onType = () => {
    const loader = document.getElementById('loader');
    const url = document.getElementById("url");
    if (url.value === '')
        console.log("Insert Something");
    else {

        if (youtubeUrl.valid(url.value)) {
            loader.setAttribute('class', 'visible');

            try {
                fetch('http://localhost:3001/', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        url: url.value,
                    })
                }).then(() => {
                    console.log('finished fetching!');
                    loader.setAttribute('class', 'invisible');
                    url.value = '';
                })
            } catch (err) {
                console.log(err);
                loader.setAttribute('class', 'invisible');
                url.value = '';
            }
        }
        else
            console.log('Invalid URL');
    }

}
export default Header;
