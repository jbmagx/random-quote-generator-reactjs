import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Chip, Card, CardBody, Button, CardFooter, Link } from '@nextui-org/react';
import { GitHubIcon } from '../../assets/svg-jsx/github-icon.jsx';
import Description from './Description.jsx';
import SnippetJSX from './SnippetJSX.jsx';
import axios from '../../axios/axios.js'

export default function RandomQuoteGenerator() {
    const [quote, setQuote] = useState('I do the very best I know how - the very best I can; and I mean to keep on doing so until the end.');
    const [author, setAuthor] = useState('Abraham Lincoln');

    const firstUseEffectExecuted = useRef(false);
    const [quotes, setQuotes] = useState([]);

    function changeQuote() {
        let random = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[random].text);
        let authorData = quotes[random].author === null ? 'Anonymous' : quotes[random].author;
        setAuthor(authorData);
    };

    useEffect(() => {
        if (firstUseEffectExecuted.current === false) {
            const fetchQuotes = async () => {
                try {
                    const response = await axios.get('/api/projects/random-quote-generator/quotes');

                    // Used for debugging. Uncomment if you need to debug.
                    // console.log(response?.data);

                    const fetchedQuotes = response?.data;

                    const filteredQuotes = fetchedQuotes.filter((fetchedQuote) => {
                        const textLength = fetchedQuote.text.length;
                        return textLength > 95 && textLength < 111;
                    });

                    setQuotes(filteredQuotes);
      
                } catch (error) {
                    console.error('There has been a problem with your fetch operation:', error);
                }
            }
            
            fetchQuotes();

            return () => {
                firstUseEffectExecuted.current = true;
            };
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(changeQuote, 12000);
        return () => clearInterval(interval);
    }, [quotes]);

    return (
        <div id='main-container' className='bg-[#23272F] py-20 sm2:py-16 sm:py-14 xs:py-12 xxs:py-10 px-6'>
            <h1 id='title' className='font-["Rancho",_cursive] text-center text-[32px] text-white mb-5'>Random Quote Generator</h1>

            <Card radius='sm' className='max-w-[440px] mx-auto h-[258px]'>
                <CardBody className='py-0 px-5 h-[160px] justify-center'>
                    <p className='mb-5 text-black text-base text-center'>&ldquo;{quote}&rdquo;</p>
                    <p className='text-black text-base text-center font-semibold'>&mdash; <i>{author}</i></p>
                </CardBody>
                <CardFooter className='flex flex-wrap justify-center px-5 pt-0 pb-5'>
                    <div className='w-full border-b mb-5'></div>
                    <Button
                            className='font-semibold'
                            color='primary'
                            variant='solid'
                            radius='sm'
                            onClick={changeQuote}
                        >
                            New Quote
                    </Button>
                </CardFooter>
            </Card>

            <Description />

            <div className='flex flex-wrap align-center justify-center gap-2 xs:max-w-[276px] mx-auto'>
                <div className='self-center font-semibold uppercase text-small tracking-tight text-white'>Tech Stack:</div>
                <div className='flex flex-wrap align-center justify-center gap-2'>
                    <Link href='https://react.dev/' target='_blank'>
                        <Chip
                            variant="solid"
                            color="primary"
                            radius='sm'
                            size="sm"
                            classNames={{ content: "font-['Inter',sans-serif] font-semibold" }}
                        >
                            ReactJS
                        </Chip>
                    </Link>
                    <Link href='https://nextui.org/' target='_blank'>
                        <Chip
                            variant="solid"
                            color="warning"
                            radius='sm'
                            size="sm"
                            classNames={{ content: "font-['Inter',sans-serif] font-semibold" }}
                        >
                            NextUI
                        </Chip>
                    </Link>
                    <Link href='https://tailwindcss.com/' target='_blank'>
                        <Chip
                            variant="solid"
                            color="success"
                            radius='sm'
                            size="sm"
                            classNames={{ content: "font-['Inter',sans-serif] font-semibold" }}
                        >
                            Tailwind CSS
                        </Chip>
                    </Link>
                    <Link href='https://www.npmjs.com/package/axios' target='_blank'>
                        <Chip
                            variant="solid"
                            color="secondary"
                            radius='sm'
                            size="sm"
                            classNames={{ content: "font-['Inter',sans-serif] font-semibold" }}
                        >
                            AXIOS
                        </Chip>
                    </Link>
                </div>
            </div>

            <div className='py-20 sm2:py-16 sm:py-14 xs:py-12 xxs:py-10'>
                <SnippetJSX />
            </div>

            <div className='flex flex-wrap justify-center'>
                <Link href='https://github.com/jbmagx/random-quote-generator-reactjs' target='_blank'>
                    <Button
                        className='bg-[#0A7EA4] text-sm uppercase font-semibold py-6 px-8'
                        color='primary'
                        variant='solid'
                        radius='full'
                        endContent={<GitHubIcon height={32} width={32} fill={'#FFFFFF'} />}
                    >
                        Project Repository
                    </Button>
                </Link>
            </div>
        </div>
    );
};