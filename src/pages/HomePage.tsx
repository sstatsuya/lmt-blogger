// src/pages/HomePage.tsx
import { useEffect, useRef, useState } from 'react';
import MyLayout from '../layouts/MainLayout';
import { EnvironmentFilled, GithubOutlined, LinkedinOutlined, MailFilled, PhoneFilled } from '@ant-design/icons';
import { descriptions, education, experience } from './data';



// const descriptions = [
//     'abc', 'def'
// ]

const HomePage = () => {
    const fullDescIdxRef = useRef(0)
    const curDescIdxRef = useRef(0)
    const fullDescRef = useRef(descriptions[0])
    const curDescRef = useRef('')
    const [currentDescText, setCurrentDescText] = useState('')
    const [isBlinkCursor, setIsBlinkCursor] = useState(false);


    useEffect(() => {
        runDesc()
    }, [])

    const runDesc = () => {
        setTimeout(async () => {
            var fullDesc = fullDescRef.current
            let curDescIdx = curDescIdxRef.current

            curDescRef.current += fullDesc[curDescIdx]
            setCurrentDescText(curDescRef.current)
            curDescIdxRef.current += 1
            if (curDescIdx < fullDesc.length - 1) runDesc()
            else {
                setIsBlinkCursor(true)
                await new Promise(r => setTimeout(r, 3000))
                setIsBlinkCursor(false)
                fullDescIdxRef.current += 1;
                if (fullDescIdxRef.current >= descriptions.length) fullDescIdxRef.current = 0
                fullDescRef.current = descriptions[fullDescIdxRef.current]
                curDescIdxRef.current = 0
                curDescRef.current = ''
                runDesc()
            }

        }, 50)
    }

    const renderTitle = () => {
        return <div className='flex-col flex-center'>
            <h2 className='text-center font-bold text-lg text-title'>Hi, This's</h2>
            <h2 className='text-center font-bold text-6xl text-white my-4'>LMT <span className='text-title underline'>BLOG</span></h2>
            <h4 className='text-gray-400 mt-4 font-medium text-lg text-center'>{currentDescText}<span className={`text-xl ${isBlinkCursor ? 'animate-blink' : ''} transform -translate-y-0.5 inline-block`}>|</span></h4>

            <div className='flex-center mt-6 gap-4'>
                <div className='text-center w-32 cursor-pointer  py-2 border-1 border-border rounded-lg bg-title hover:scale-105 transition-transform duration-200'>
                    <span className='text-black'>Liên hệ</span>
                </div>

                <div className='text-center w-32 group cursor-pointer  py-2 border-1 border-border rounded-lg bg-transparent hover:scale-105 hover:bg-title transition-all duration-500'>
                    <span className=' text-white group-hover:text-black duration-500'>My's projects</span>
                </div>

                <div className='p-2 cursor-pointer group rounded-md  flex-center transition-all duration-500 transform hover:scale-150 hover:rotate-20'>
                    <GithubOutlined style={{ fontSize: '24px' }} className='text-white group-hover:text-title' />
                </div>

                <div className='p-2 cursor-pointer group rounded-md  flex-center transition-all duration-500 transform hover:scale-150 hover:rotate-20'>
                    <LinkedinOutlined style={{ fontSize: '24px' }} className='text-white group-hover:text-title' />
                </div>
            </div>
        </div>
    }

    const renderAboutMe = () => {
        return <div >
            <SectionTitle title='About me' desc='Những thông tin cơ bản của tôi, chi tiết hơn nằm trong CV, tôi lười ghi ra quá' />

            <div className='flex flex-row flex-center gap-6 items-stretch'>
                <AboutMeItem title={'Education'} data={education} />
                <AboutMeItem title={'Experience'} data={experience} />
            </div>


        </div>
    }

    const renderProjectList = () => {
        return <div >
            <SectionTitle title='Projects' desc='Dưới đây là một số dự án cá nhân của tôi' />

            <div className='flex flex-row flex-center gap-6 items-stretch'>
                <ProjectItem />
                <ProjectItem />
            </div>
        </div>
    }

    const renderGetInTouch = () => {
        return <div >
            <SectionTitle title='Get In Touch' desc='Nếu bạn có điều gì thắc mắc, hoặc muốn liên hệ với tôi' />

            <div className='flex flex-1 align-middle gap-16'>
                <div className='flex w-[30%] flex-col'>
                    <p className='font-semibold text-white text-lg'>Thông tin liên hệ</p>
                    <p className=' text-gray-400 text-sm mt-2'>Hoặc có thể gửi thư cho tôi bằng cách điền các thông tin ở bảng bên phải nhé</p>

                    <div className='flex gap-2 mt-4'>
                        <MailFilled className='text-white mt-1 self-start' />
                        <div>
                            <p className='font-semibold text-white text-base'>Email</p>
                            <p className=' text-gray-400 text-base'>binpro113wer@gmail.com</p>
                        </div>
                    </div>

                    <div className='flex gap-2 mt-4'>
                        <PhoneFilled className='text-white mt-1 self-start transform scale-x-[-1]' />
                        <div>
                            <p className='font-semibold text-white text-base'>Phone</p>
                            <p className=' text-gray-400 text-base'>091xxxxxxx</p>
                        </div>
                    </div>

                    <div className='flex gap-2 mt-4'>
                        <EnvironmentFilled className='text-white mt-1 self-start' />
                        <div>
                            <p className='font-semibold text-white text-base'>Địa chỉ</p>
                            <p className=' text-gray-400 text-base'>Thủ Đức, TP.HCM, Việt Nam</p>
                        </div>
                    </div>

                </div>
                <div className='flex w-[70%] flex-col border-1 p-4 border-dim-border rounded-xl'>
                    <div className='flex-1 flex align-middle gap-4'>
                        <div className='flex flex-col flex-1 '>
                            <p className='text-sm text-white'>Tên bạn</p>
                            <input className='text-sm outline-offset-0 flex-1 mt-1 px-2 text-gray-400 h-8 border-1 border-dim-border focus:border-gray-500 focus:outline focus:outline-gray-300 focus:outline-1 outline-none rounded-lg bg-transparent' />
                        </div>
                        <div className='flex flex-col flex-1'>
                            <p className='text-sm text-white'>Email của bạn</p>
                            <input className='text-sm outline-offset-0 flex-1 mt-1 px-2 text-gray-400 h-8 border-1 border-dim-border focus:border-gray-500 focus:outline focus:outline-gray-300 focus:outline-1 outline-none rounded-lg bg-transparent' />
                        </div>
                    </div>

                    <div className='flex flex-col flex-1 mt-4'>
                        <p className='text-sm text-white'>Tiêu đề</p>
                        <input className='text-sm outline-offset-0 mt-1 px-2 text-gray-400 h-8 border-1 border-dim-border focus:border-gray-500 focus:outline focus:outline-gray-300 focus:outline-1 outline-none rounded-lg bg-transparent' />
                    </div>

                    <div className='flex flex-col flex-1 mt-4'>
                        <p className='text-sm text-white'>Nội dung</p>
                        <textarea rows={5} className='py-2 min-h-20 text-sm outline-offset-0 mt-1 px-2 text-gray-400 h-8 border-1 border-dim-border focus:border-gray-500 focus:outline focus:outline-gray-300 focus:outline-1 outline-none rounded-lg bg-transparent' />
                    </div>

                    <div className='w-full py-2 bg-title text-white font-semibold text-center rounded-xl mt-4 cursor-pointer hover:opacity-80 transition-all duration-500'>
                        Gửi
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <MyLayout>
            <div className="flex flex-col p-6 align-middle px-[20%]">
                {renderTitle()}
                {renderAboutMe()}
                {renderProjectList()}
                {renderGetInTouch()}
            </div>
        </MyLayout>
    );
};

export default HomePage;


const SectionTitle = ({ title, desc }: { title: string, desc: string }) => {
    return <div className='mt-32 mb-8'>
        <h1 className='text-4xl text-white font-medium relative inline-block'>{title}
            <div className="rounded-md absolute left-0 -bottom-2 w-[50%] h-[4px] bg-title group-hover:w-full transition-all duration-300" />
        </h1>
        <h4 className='mt-4 text-gray-400'>{desc}</h4>
    </div>
}



const AboutMeItem = ({ title, data }: { title: string; data: any[] }) => {
    return <div className='border-1 border-dim-border rounded-md p-4 flex-1 flex flex-col gap-4 animate-zoomIn'>
        <p className='font-semibold text-white text-xl'>
            <LinkedinOutlined style={{ fontSize: '24px' }} className='text-title mr-4 group-hover:text-title' />
            {title}</p>
        <div className='flex-col flex gap-2'>
            {
                data.map((item) => {
                    return Object.keys(item).map((i, j) => {
                        const isTitle = i === 'work' || i === 'title'
                        return <p key={j} className={`${isTitle ? 'text-base font-semibold text-white' : 'text-sm text-gray-400'}`}>{item[i]}</p>
                    })
                })
            }

        </div>
    </div>
}

const projectLang = [
    'ReactJS', 'NodeJS', 'MongoDB', 'Rest API'
]

const ProjectItem = () => {
    return <div className='border-1 border-dim-border rounded-2xl pb-4 flex-1 flex flex-col gap-4 animate-zoomIn overflow-hidden'>
        <div className='w-full h-32 bg-title'></div>

        <div className='px-4'>
            <p className='font-semibold text-white text-xl'>Lorem Ipsum is simply dummy text</p>
            <p className='text-gray-400 text-base mt-2 line-clamp-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled</p>
            <div className='gap-4 flex flex-row align-middle mt-4'>
                {
                    projectLang.map((item) => {
                        return <span className='p-1 px-2 text-xs rounded-lg bg-title text-center text-gray-300'>{item}</span>
                    })
                }
            </div>
        </div>
    </div>
}