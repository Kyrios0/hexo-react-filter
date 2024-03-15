/*
    This script is used to replace the <React {...}/> tag in hexo markdown file with HTML code for the actual React component.
    see README.md for more details
*/
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as allComponents from "../../../source/_components/components";

hexo.extend.filter.register('before_post_render', (data) => {
    if (allComponents) {
        const regex = /<React\s+({[^}]+})>/g;
        const matches = [...data.content.matchAll(regex)];

        const results = matches.map(match => {
            const paramString = match[1]; // The captured parameter string
            try {
                const params = JSON.parse(paramString);
                const Component = allComponents[params.component];
                if (!Component) {
                    console.error(`Component not found: ${params.component}`);
                    return null;
                }
                // console.log("allComponents", allComponents);
                console.log(`[+] hexo-react-filter: Rendering Component ${params.component} for ${data.title}`);
                const staticHtml = renderToStaticMarkup(<Component {...params}/>);
                data.content = data.content.replace(match[0], staticHtml);
                return { label: match[0] }; // return for results
            } catch (error) {
                console.error("[!] Error rendering component:", paramString);
                console.error("[!]", error);
                return null;
            }});
        // print result if need debug
    }

    return data;
});