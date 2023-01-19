export const toggleThemeModule = (() => {
const toggleTheme = document.getElementById('theme-mode');
    toggleTheme.addEventListener('change', (e) => {
        if (toggleTheme.checked === true) {
            document.documentElement.classList.remove("light")
            document.documentElement.classList.add("dark")
            window.localStorage.setItem('mode', 'dark');
        } else {
            document.documentElement.classList.remove("dark")
            document.documentElement.classList.add("light")
            window.localStorage.setItem('mode', 'light');
        }
    });
})()

export const openCloseSidebarModule = (() => {

    const btn = document.querySelector('.open-aside');
    const side = document.querySelector('nav');
    // side.style.width = "250px"
    btn.addEventListener('click', (e) => {
        changeWidth(side)
    });

    const changeWidth = (side) => {
        if(side.style.width === "250px") {
            side.style.width = "0";
            // side.style.zIndex = "1";
        } else {
            side.style.width = "250px";
            // side.style.zIndex = "10";
        }
    }
})();

// const toggleSidebar = () => {
//     let grid = document.querySelector(".contents");
//     let currentWidth = window.innerWidth;
//     if (currentWidth <= 700) {
//       if (grid.style.gridTemplateAreas === "\"header header\" \"sidebar main\"") {
//         grid.style.gridTemplateAreas = "\"header\" \"sidebar\" \"main\"";
//       } else {
//         grid.style.gridTemplateAreas = "\"header header\" \"sidebar main\"";
//       }
//     }
// }

