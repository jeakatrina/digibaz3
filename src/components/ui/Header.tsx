import { FC } from 'react'

interface HeaderProps {
    title: string
}

const Header: FC<HeaderProps> = ({
    title
}) => {
    return (
        <div className='px-4 py-4 mx-auto'>
            <h1 className='text-xl text-primary-foreground font-bold text-center'>{title}</h1>
        </div>
    )
}

export default Header