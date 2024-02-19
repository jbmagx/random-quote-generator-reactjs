export default function Description() {
    return (
        <div
            id='project-description'
            className='max-w-[704px] sm:max-w-[576px] py-20 sm2:py-16 sm:py-14 xs:py-12 xxs:py-10 mx-auto'
        >
            <p className='text-white tracking-tight mb-5'>
                This Random Quote Generator is a React-based web application
                that aims to provide users with a consistent source of
                inspiration, wisdom, and thought-provoking quotes. After
                rendering all React components, the web app fetches quotes from
                the server, filters them, and selects only those with a text
                length falling within the range of 95 to 111 characters.
            </p>
            <p className='text-white tracking-tight'>
                The Random Quote Generator initially displays a default quote
                and then updates it every 12 seconds using the setInterval
                method. Users can also manually change the displayed quote by
                clicking the 'New Quote' button. You can review the code below
                to gain a comprehensive understanding of how the app operates.
            </p>
        </div>
    );
};