import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface TOCItem {
    level: number;
    text: string;
    id: string;
}

const generateId = (text: string) =>
    text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

const TitleList = ({ html, scrollToHeading }: { html: string, scrollToHeading: any }) => {
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

            // Lấy id hiện tại nếu có, nếu không thì bỏ qua
            const existingId = el.id || generateId(text); // Nếu đã có id thì dùng, không có thì sinh id mới

            found.push({ level, text, id: existingId });
        });

        setHeadings(found);
    }, [html]);
    return (
        <div className="sticky left-0 right-0" style={{top: '80px'}}>
            {headings.map((item, index) => (
                <div
                    key={index}
                    className={`cursor-pointer hover:underline mb-4`}
                    style={{ marginLeft: `${(item.level - 1) * 16}px` }} // thụt theo cấp
                    onClick={() => {
                        const el = document.getElementById(item.id);
                        console.log('tien xem el ', item.id)
                        scrollToHeading(item.id)
                    }}
                >
                    <p className='text-white text-base mb-0'>{item.text}</p>
                </div>
            ))}
        </div>
    );
};

export default TitleList
