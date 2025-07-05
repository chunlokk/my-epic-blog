import React from 'react';
import Blog from '../../components/Blog';

const AboutAuthor = () => (
    <Blog>
        <article>
            <h1>About the Author</h1>
            <p>I like submitting things at exactly at the deadline, which is why I am submitting this at 23:50 EST</p>
            <p>You can contact me using the contact information on my <a href="https://github.com/chunlokk">GitHub page!</a></p>
        </article>
    </Blog>
);

AboutAuthor.postId = 1;

export default AboutAuthor;
