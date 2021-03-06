import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MobileMain from '../organisms/MobileMain';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import '../../sass/components/templates/Layout.scss';

const Layout = (props) => {
	const { children, img, imgText } = props;
	const [modal, setModal] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem('token');
		window.location.replace('/login')
	}

	const putContent = () => {
		if (window.screen.width < 600) {
			const icon = modal ? (
				<AiOutlineClose
					size='40'
					color='#fffeea'
					onClick={() =>
						modal ? setModal(false) : setModal(true)
					}
				/>
			) : (
				<GiHamburgerMenu
					size='40'
					color='#fffeea'
					onClick={() =>
						modal ? setModal(false) : setModal(true)
					}
				/>
			);
			return icon;
		}

		return (
			<nav className='header__nav'>
				<NavLink activeClassName='selected' to='/result'>
					CREAR REPORTE
				</NavLink>
				{ !localStorage.getItem('token') && <NavLink activeClassName='selected' to='/login'>
					LOGIN
				</NavLink>}
				{ !!localStorage.getItem('token') && <a href="#" activeClassName='selected' onClick={handleLogout}>
					LOGOUT
				</a>}
				{!localStorage.getItem('token') &&<NavLink activeClassName='selected' to='/register'>
					REGISTRARME
				</NavLink>}
			</nav>
		);
	};

	return (
		<>
			<header className='header'>
				<Link to='/home' className='header__anchor'>
					<img
						className='header__logo'
						src={
							img
								? img
								: 'https://firebasestorage.googleapis.com/v0/b/gasprice-85c9b.appspot.com/o/Foundations%2FLogos%2Flogo.png?alt=media&token=2a6fd194-791f-44dc-9962-deaf5489fda0'
						}
						alt={imgText ? imgText : 'Logo de Gas-Price'}
					/>
				</Link>
				{putContent()}
				<MobileMain isOpen={modal}>
					<h1>hola</h1>
				</MobileMain>
			</header>
			{children}
		</>
	);
};

export default Layout;
