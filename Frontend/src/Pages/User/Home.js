import React from 'react';

function Home() {
    return(
        <>
            <div className="w-full h-[300px] flex items-center justify-center bg-cover bg-no-repeat" style={{backgroundImage: "url('Assets/background.jpg')"}}>
                <div className="bg-black/40 p-6 rounded-lg text-center">
                    <h1 className="text-white">Welcome to the User Home Page</h1>
                    <p className="text-white">This is the home page for users.</p>
                </div>
            </div>
            <br />
            <div className="w-hvh p-6 flex justify-center items-center">
                <div className="max-w-2xl">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim eros sed pretium congue. Pellentesque bibendum quam id quam maximus ultrices. Morbi pellentesque volutpat lacus at imperdiet. Nunc ac rutrum urna, nec commodo risus. Suspendisse ac lectus vehicula, vulputate massa at, cursus sem. Fusce at porta diam. Duis commodo luctus lacus quis posuere. Aliquam quis sem nec arcu vestibulum maximus sagittis at arcu.</p>
                    <br />
                    <p>Nulla facilisi. Donec ut nunc nec ligula efficitur fringilla. Sed ac nunc id enim tincidunt varius. In hac habitasse platea dictumst. Donec euismod, nisi vel consectetur interdum, nisl nisi aliquet nunc, eget bibendum nunc nisi euismod nunc. Sed at erat a augue convallis facilisis. Nulla facilisi. Donec ut nunc nec ligula efficitur fringilla.</p>
                    <br />
                    <p>In hac habitasse platea dictumst. Donec euismod, nisi vel consectetur interdum, nisl nisi aliquet nunc, eget bibendum nunc nisi euismod nunc. Sed at erat a augue convallis facilisis. Nulla facilisi. Donec ut nunc nec ligula efficitur fringilla.</p>
                    <br />
                    <p>Sed id pulvinar lorem. Vestibulum porttitor fermentum finibus. Nulla maximus nec felis in ullamcorper. Sed tempus gravida quam, sed commodo diam egestas sed. Praesent vitae elit mollis, faucibus velit vitae, vulputate diam. Mauris tempus quam tortor, vel suscipit mauris consequat ut. Integer volutpat dolor at dolor porttitor mattis. Praesent felis dui, sodales vel placerat vel, egestas vitae tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                </div>
            </div>
            <br />
            <hr className="mx-24" />
            <br />
            <div className="w-hvh p-6 flex justify-center items-center">
                <div className="max-w-2xl">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim eros sed pretium congue. Pellentesque bibendum quam id quam maximus ultrices. Morbi pellentesque volutpat lacus at imperdiet. Nunc ac rutrum urna, nec commodo risus. Suspendisse ac lectus vehicula, vulputate massa at, cursus sem. Fusce at porta diam. Duis commodo luctus lacus quis posuere. Aliquam quis sem nec arcu vestibulum maximus sagittis at arcu.</p>
                    <br />
                    <p>Nulla facilisi. Donec ut nunc nec ligula efficitur fringilla. Sed ac nunc id enim tincidunt varius. In hac habitasse platea dictumst. Donec euismod, nisi vel consectetur interdum, nisl nisi aliquet nunc, eget bibendum nunc nisi euismod nunc. Sed at erat a augue convallis facilisis. Nulla facilisi. Donec ut nunc nec ligula efficitur fringilla.</p>
                    <br />
                    <p>In hac habitasse platea dictumst. Donec euismod, nisi vel consectetur interdum, nisl nisi aliquet nunc, eget bibendum nunc nisi euismod nunc. Sed at erat a augue convallis facilisis. Nulla facilisi. Donec ut nunc nec ligula efficitur fringilla.</p>
                    <br />
                    <p>Sed id pulvinar lorem. Vestibulum porttitor fermentum finibus. Nulla maximus nec felis in ullamcorper. Sed tempus gravida quam, sed commodo diam egestas sed. Praesent vitae elit mollis, faucibus velit vitae, vulputate diam. Mauris tempus quam tortor, vel suscipit mauris consequat ut. Integer volutpat dolor at dolor porttitor mattis. Praesent felis dui, sodales vel placerat vel, egestas vitae tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                </div>
            </div>
            <br />
            <div className="bg-black/50 w-hvh p-6 flex justify-between items-center gap-4">
                <div>
                    <h1 className="text-white text-2xl">User Home Page</h1>
                    <p className="text-white">This is the home page for users.</p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2 text-end">
                    <a className="text-white" href="/">Home</a>
                    <a className="text-white" href="/items">Items</a>
                    <a className="text-white" href="/login">Login</a>
                    <a className="text-white" href="/register">Register</a>
                </div>
            </div>
        </>
    )
}

export default Home;
