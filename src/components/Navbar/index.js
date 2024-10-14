import { Nav, NavLink, NavLogo, NavMenu } from './navbarElements'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLogo>
                        UMASS - CS520
                    </NavLogo>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/tags">
                        Tags
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar
