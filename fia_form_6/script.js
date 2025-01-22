const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const aboutBtn = document.getElementById('aboutBtn');
        const dropdownContent = document.getElementById('dropdownContent');

        // Initialize sidebar state based on screen size
        let isSidebarOpen = window.innerWidth > 768;
        updateSidebarState();

        // Toggle sidebar
        menuToggle.addEventListener('click', () => {
            isSidebarOpen = !isSidebarOpen;
            updateSidebarState();
        });

        // Toggle dropdown
        aboutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!aboutBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                isSidebarOpen = false;
            } else {
                isSidebarOpen = true;
            }
            updateSidebarState();
        });

        // Update sidebar and main content state
        function updateSidebarState() {
            if (window.innerWidth <= 768) {
                // Mobile view
                sidebar.classList.toggle('open', isSidebarOpen);
                sidebar.classList.remove('closed');
                mainContent.classList.remove('full');
            } else {
                // Desktop view
                sidebar.classList.remove('open');
                sidebar.classList.toggle('closed', !isSidebarOpen);
                mainContent.classList.toggle('full', !isSidebarOpen);
            }
        }