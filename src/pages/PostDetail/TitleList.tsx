import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface TOCItem {
    level: number;
    text: string;
    id: string;
}

const generateId = (text: string) =>
    text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

const TitleList = ({ html }: { html: string }) => {
    const [headings, setHeadings] = useState<TOCItem[]>([]);

    useEffect(() => {
        const sanitized = DOMPurify.sanitize(html);
        const parser = new DOMParser();
        const doc = parser.parseFromString(sanitized, 'text/html');

        const found: TOCItem[] = [];
        const headingTags = doc.querySelectorAll('h1, h2, h3');

        headingTags.forEach((el) => {
            const text = el.textContent?.trim() || '';
            if (!text) return; // ⛔ Bỏ qua nếu trống

            const level = parseInt(el.tagName[1]); // 1, 2, 3
            const id = generateId(text);

            el.setAttribute('id', id);
            found.push({ level, text, id });
        });

        setHeadings(found);
    }, [html]);

    return (
        <div className="">
            {headings.map((item, index) => (
                <div
                    key={index}
                    className={`cursor-pointer hover:underline mb-4`}
                    style={{ marginLeft: `${(item.level - 1) * 16}px` }} // thụt theo cấp
                    onClick={() => {
                        const el = document.getElementById(item.id);
                        if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    <p className='text-white text-base mb-0'>{item.text}</p>
                </div>
            ))}
        </div>
    );
};

export default TitleList
