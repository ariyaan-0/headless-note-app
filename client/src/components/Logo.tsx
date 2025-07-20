interface LogoProps {
	width?: string;
}

function Logo({ width = "100px" }: LogoProps) {
	return <div style={{ width }}>Note_Logo</div>;
}

export default Logo;
