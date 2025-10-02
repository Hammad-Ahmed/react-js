function Summary() {
    return (
        <div>
            <h2>Summary</h2>
            <ul>
                <li>We delete and remove al unwanted files from src folder and comments to analyze core structure of react.js.</li> 
                <li>Also removed react strict mode from index.js file to check it is working fine or not. it worked fine.</li>
                <li>We create a new component named summary.js and imported it in app.js file.</li>
                <li>We realized that component name must start with capital letter.</li>
                <li>Component File name can be start with small letter but should be capital letter is a good practice.</li>
                <li>We also learned that we can create multiple components and import them in app.js file.</li>
                <li>Component's return HTML code must be wrapped in a single parent element.</li>
                <li>We can use div, section, article, fragment(<></>) etc. as a parent element.</li>
            </ul>
        </div>
    );
}

export default Summary;