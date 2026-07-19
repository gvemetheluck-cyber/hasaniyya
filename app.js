// Madrasathul Hasaniyya "Sweet of Mahabba" Program Management Logic
const { createApp, ref, computed, watch, onMounted } = Vue;

const DEFAULT_PROGRAMS = [
  // Kids Boys & Girls
  { id: 'prog-1', name: 'Baloon Pottikkal', category: 'Kids', status: 'Completed', students: [
    { id: 'stud-k-1', name: 'Afnan Ahmed', teamId: 'al-noor', classLevel: 'Class 1', registeredAt: '2026-07-18T10:00:00Z' },
    { id: 'stud-k-2', name: 'Rayan K', teamId: 'al-fath', classLevel: 'Class 1', registeredAt: '2026-07-18T10:05:00Z' },
    { id: 'stud-k-3', name: 'Nihan Fathima', teamId: 'al-buraq', classLevel: 'Class 2', registeredAt: '2026-07-18T10:10:00Z' }
  ], result: { first: 'stud-k-1', second: 'stud-k-2', third: 'stud-k-3' } },
  { id: 'prog-2', name: 'Manjadi Perukkal', category: 'Kids', status: 'Ongoing', students: [
    { id: 'stud-k-4', name: 'Zahra Fatima', teamId: 'al-noor', classLevel: 'Class 2', registeredAt: '2026-07-18T10:15:00Z' },
    { id: 'stud-k-5', name: 'Muhammad Shamil', teamId: 'al-fath', classLevel: 'Class 1', registeredAt: '2026-07-18T10:20:00Z' }
  ], result: null },
  { id: 'prog-3', name: 'Memory Test', category: 'Kids', status: 'Pending', students: [], result: null },
  { id: 'prog-4', name: 'Dictation Arabi (Class 1)', category: 'Kids', status: 'Pending', students: [], result: null },
  { id: 'prog-5', name: 'Dictation Arabi & Malayalam (Class 2)', category: 'Kids', status: 'Pending', students: [], result: null },

  // LP Boys Class 3,4
  { id: 'prog-6', name: 'Story Telling', category: 'LP Boys', status: 'Completed', students: [
    { id: 'stud-lpb-1', name: 'Ammar Jamil', teamId: 'al-fath', classLevel: 'Class 3', registeredAt: '2026-07-18T10:30:00Z' },
    { id: 'stud-lpb-2', name: 'Adil K', teamId: 'al-buraq', classLevel: 'Class 4', registeredAt: '2026-07-18T10:35:00Z' }
  ], result: { first: 'stud-lpb-1', second: 'stud-lpb-2', third: '' } },
  { id: 'prog-7', name: 'Madh Song', category: 'LP Boys', status: 'Ongoing', students: [
    { id: 'stud-lpb-3', name: 'Muhammad Rayan', teamId: 'al-noor', classLevel: 'Class 4', registeredAt: '2026-07-18T10:40:00Z' }
  ], result: null },
  { id: 'prog-8', name: 'Reading Arabi Malayalam', category: 'LP Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-9', name: 'Quiz', category: 'LP Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-10', name: 'Pencil Drawing', category: 'LP Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-11', name: 'Dictation Arabi & Malayalam', category: 'LP Boys', status: 'Pending', students: [], result: null },

  // LP Girls
  { id: 'prog-12', name: 'Reading Arabi Malayalam', category: 'LP Girls', status: 'Completed', students: [
    { id: 'stud-lpg-1', name: 'Aisha Minha', teamId: 'al-noor', classLevel: 'Class 4', registeredAt: '2026-07-18T10:45:00Z' },
    { id: 'stud-lpg-2', name: 'Fathima Nafees', teamId: 'al-fath', classLevel: 'Class 3', registeredAt: '2026-07-18T10:50:00Z' },
    { id: 'stud-lpg-3', name: 'Zainab Aman', teamId: 'al-buraq', classLevel: 'Class 4', registeredAt: '2026-07-18T10:55:00Z' }
  ], result: { first: 'stud-lpg-1', second: 'stud-lpg-3', third: 'stud-lpg-2' } },
  { id: 'prog-13', name: 'Quiz', category: 'LP Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-14', name: 'Dictation Arabi & Malayalam', category: 'LP Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-15', name: 'Pencil Drawing', category: 'LP Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-16', name: 'Baloon Pottikkal', category: 'LP Girls', status: 'Pending', students: [], result: null },

  // UP Boys Class 5,6,7
  { id: 'prog-17', name: 'Speech Malayalam', category: 'UP Boys', status: 'Completed', students: [
    { id: 'stud-upb-1', name: 'Bilal Ahmed', teamId: 'al-buraq', classLevel: 'Class 7', registeredAt: '2026-07-18T11:00:00Z' },
    { id: 'stud-upb-2', name: 'Omar Farooq', teamId: 'al-noor', classLevel: 'Class 6', registeredAt: '2026-07-18T11:05:00Z' }
  ], result: { first: 'stud-upb-1', second: 'stud-upb-2', third: '' } },
  { id: 'prog-18', name: 'Madh Song', category: 'UP Boys', status: 'Ongoing', students: [], result: null },
  { id: 'prog-19', name: 'Quiz', category: 'UP Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-20', name: 'Quran Recitation', category: 'UP Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-21', name: 'Azaan', category: 'UP Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-22', name: 'Handwriting Arabi Malayalam', category: 'UP Boys', status: 'Pending', students: [], result: null },

  // UP Girls
  { id: 'prog-23', name: 'Quiz', category: 'UP Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-24', name: 'Hifz', category: 'UP Girls', status: 'Completed', students: [
    { id: 'stud-upg-1', name: 'Maryam Ansar', teamId: 'al-noor', classLevel: 'Class 7', registeredAt: '2026-07-18T11:10:00Z' },
    { id: 'stud-upg-2', name: 'Khadija Nusrath', teamId: 'al-fath', classLevel: 'Class 6', registeredAt: '2026-07-18T11:15:00Z' },
    { id: 'stud-upg-3', name: 'Safa Fathima', teamId: 'al-buraq', classLevel: 'Class 7', registeredAt: '2026-07-18T11:20:00Z' }
  ], result: { first: 'stud-upg-1', second: 'stud-upg-2', third: 'stud-upg-3' } },
  { id: 'prog-25', name: 'Handwriting Arabi Malayalam', category: 'UP Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-26', name: 'Story Writing', category: 'UP Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-27', name: 'Treasure Hunt', category: 'UP Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-28', name: 'Painting Watercolor', category: 'UP Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-29', name: 'Bottle Filling', category: 'UP Girls', status: 'Pending', students: [], result: null },

  // HS Boys Class 8,9,10
  { id: 'prog-30', name: 'Speech Malayalam', category: 'HS Boys', status: 'Ongoing', students: [
    { id: 'stud-hsb-1', name: 'Rayan Farhan', teamId: 'al-buraq', classLevel: 'Class 9', registeredAt: '2026-07-18T12:00:00Z' }
  ], result: null },
  { id: 'prog-31', name: 'Mappilappat', category: 'HS Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-32', name: 'Madh Song', category: 'HS Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-33', name: 'Quiz', category: 'HS Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-34', name: 'Poster Designing', category: 'HS Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-35', name: 'Story Writing', category: 'HS Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-36', name: 'Poem Writing', category: 'HS Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-37', name: 'Penalty Shootout', category: 'HS Boys', status: 'Completed', students: [
    { id: 'stud-hsb-2', name: 'Naufal Ali', teamId: 'al-noor', classLevel: 'Class 10', registeredAt: '2026-07-18T12:05:00Z' },
    { id: 'stud-hsb-3', name: 'Suhail Muhammad', teamId: 'al-fath', classLevel: 'Class 10', registeredAt: '2026-07-18T12:10:00Z' }
  ], result: { first: 'stud-hsb-2', second: 'stud-hsb-3', third: '' } },

  // HS Girls
  { id: 'prog-38', name: 'Quiz', category: 'HS Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-39', name: 'Poster Designing', category: 'HS Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-40', name: 'Story Writing', category: 'HS Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-41', name: 'Poem Writing', category: 'HS Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-42', name: 'Origami', category: 'HS Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-43', name: 'Malayalam Speech (Only Malayalam)', category: 'HS Girls', status: 'Pending', students: [], result: null },

  // General Boys
  { id: 'prog-44', name: 'Group Song', category: 'General Boys', status: 'Pending', students: [], result: null },
  { id: 'prog-45', name: 'Mappilappat', category: 'General Boys', status: 'Pending', students: [], result: null },

  // General Girls
  { id: 'prog-46', name: 'Mappilappat', category: 'General Girls', status: 'Pending', students: [], result: null },
  { id: 'prog-47', name: 'Mouleed', category: 'General Girls', status: 'Pending', students: [], result: null }
];

const TEAMS = [
  { id: 'al-noor', name: 'Team Samarkand', color: '#00b4d8', bgClass: 'bg-[#00b4d8]', textClass: 'text-[#00b4d8]', borderClass: 'border-[#00b4d8]/40', icon: 'shield', hoverBg: 'hover:bg-[#00b4d8]/10' },
  { id: 'al-fath', name: 'Team Granada', color: '#c1121f', bgClass: 'bg-[#c1121f]', textClass: 'text-[#c1121f]', borderClass: 'border-[#c1121f]/40', icon: 'zap', hoverBg: 'hover:bg-[#c1121f]/10' },
  { id: 'al-buraq', name: 'Team Cairo', color: '#d4af37', bgClass: 'bg-[#d4af37]', textClass: 'text-[#d4af37]', borderClass: 'border-[#d4af37]/40', icon: 'award', hoverBg: 'hover:bg-[#d4af37]/10' }
];

const DEFAULT_PHOTOS = [
  { id: 'photo-1', title: 'Quran Recitation Contest', category: 'LP Boys', description: 'Beautiful recitation of the Holy Quran, emphasizing rules of Tajweed and correct memorization.', url: 'https://images.unsplash.com/photo-1584281729088-348244a04478?q=80&w=600&auto=format&fit=crop', date: '2026-07-18T10:00:00Z' },
  { id: 'photo-2', title: 'Islamic Songs Performance', category: 'LP Girls', description: 'Melodious Nasheeds and praises sung by our LP and UP contestants, invoking deep spiritual love.', url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=600&auto=format&fit=crop', date: '2026-07-18T10:05:00Z' },
  { id: 'photo-3', title: 'Lettering & Quranic Art', category: 'HS Girls', description: 'Elegant scripts drawn by young artists from the LP and High School sections showcasing Islamic heritage.', url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=600&auto=format&fit=crop', date: '2026-07-18T10:10:00Z' },
  { id: 'photo-4', title: 'Divisional Quiz Finale', category: 'UP Boys', description: 'A high-pressure academic showdown testing students on Quranic knowledge, Hadith, Fiqh, and history.', url: 'https://images.unsplash.com/photo-1518133680487-3bc4b5a49cd0?q=80&w=600&auto=format&fit=crop', date: '2026-07-18T10:15:00Z' },
  { id: 'photo-5', title: 'Elocution and Oratory', category: 'HS Boys', description: 'Inspiring presentations and speeches delivered by senior students demonstrating powerful oratory skills.', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop', date: '2026-07-18T10:20:00Z' },
  { id: 'photo-6', title: 'Islamic Seminar & Fiqh Moot', category: 'HS Boys', description: 'Critical discussions and presentations on jurisprudence and classical Islamic texts by HS divisions.', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop', date: '2026-07-18T10:25:00Z' }
];

createApp({
  setup() {
    // Navigation / Routing state
    const currentView = ref('home'); // 'home', 'results', 'schedule', 'gallery', 'manager', 'login'
    const managerSubView = ref('register'); // 'register', 'results', 'gallery'

    // Auth state
    const isAuthenticated = ref(localStorage.getItem('hasaniyya_auth') === 'true');
    const loginEmail = ref('');
    const loginPassword = ref('');
    const loginError = ref('');

    // Program list containing registered students and results
    const programs = ref([]);
    
    // Photo Gallery state
    const photos = ref([]);
    const showLightbox = ref(false);
    const lightboxIndex = ref(0);

    // Form inputs for adding a photo
    const newPhotoTitle = ref('');
    const newPhotoCategory = ref('General');
    const newPhotoDescription = ref('');
    const newPhotoUrl = ref('');
    const newPhotoSource = ref('url'); // 'url' | 'file'
    const photoFileRef = ref(null);

    // Theme state (defaults to dark mode)
    const isDark = ref(true);

    // Search and filters
    const searchFilter = ref('');
    const selectedCategoryFilter = ref('All');

    // UI state modals
    const showAddStudentModal = ref(false);
    const showParticipantsModal = ref(false);
    const showResultsModal = ref(false); 
    const selectedProgram = ref(null);

    // Form inputs for registering a student
    const newStudentName = ref('');
    const newStudentTeam = ref('al-noor');
    const newStudentClass = ref(''); 
    const registerError = ref('');

    // Form inputs for publishing results
    const resultFirst = ref('');
    const resultSecond = ref('');
    const resultThird = ref('');
    const resultError = ref('');

    // Toast notifications
    const toastMessage = ref('');
    const toastType = ref('success'); 
    const showToast = ref(false);

    const triggerToast = (msg, type = 'success') => {
      toastMessage.value = msg;
      toastType.value = type;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    // Route transitions with Hash Support
    const setView = (viewName) => {
      if (viewName === 'manager' && !isAuthenticated.value) {
        currentView.value = 'login';
        window.location.hash = '#login';
      } else {
        currentView.value = viewName;
        if (viewName === 'home') {
          // Clear hash cleanly
          history.pushState("", document.title, window.location.pathname + window.location.search);
        } else {
          window.location.hash = '#' + viewName;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHashRoute = () => {
      const hash = window.location.hash;
      if (hash === '#results') {
        currentView.value = 'results';
      } else if (hash === '#schedule') {
        currentView.value = 'schedule';
      } else if (hash === '#gallery') {
        currentView.value = 'gallery';
      } else if (hash === '#login') {
        currentView.value = 'login';
      } else if (hash === '#manager' || hash === '#dashboard') {
        if (isAuthenticated.value) {
          currentView.value = 'manager';
        } else {
          currentView.value = 'login';
        }
      } else {
        currentView.value = 'home';
      }
    };

    // Load initial data
    const loadData = () => {
      try {
        const stored = localStorage.getItem('hasaniyya_programs');
        if (stored) {
          const parsed = JSON.parse(stored);
          const isCompatible = Array.isArray(parsed) && parsed.every(p => p.id && p.name && p.category && ('status' in p) && ('result' in p));
          const hasNewCategories = Array.isArray(parsed) && parsed.some(p => p.category === 'Kids' || p.category === 'LP Boys');
          if (!isCompatible || !hasNewCategories) {
            programs.value = JSON.parse(JSON.stringify(DEFAULT_PROGRAMS));
            saveData();
          } else {
            programs.value = parsed;
          }
        } else {
          programs.value = JSON.parse(JSON.stringify(DEFAULT_PROGRAMS));
          saveData();
        }
      } catch (e) {
        console.error("Failed to load programs", e);
        programs.value = JSON.parse(JSON.stringify(DEFAULT_PROGRAMS));
      }
    };

    const saveData = () => {
      localStorage.setItem('hasaniyya_programs', JSON.stringify(programs.value));
    };

    // Photo Gallery Methods
    const loadPhotos = () => {
      try {
        const stored = localStorage.getItem('hasaniyya_photos');
        if (stored) {
          photos.value = JSON.parse(stored);
        } else {
          photos.value = JSON.parse(JSON.stringify(DEFAULT_PHOTOS));
          savePhotos();
        }
      } catch (e) {
        console.error("Failed to load photos", e);
        photos.value = JSON.parse(JSON.stringify(DEFAULT_PHOTOS));
      }
    };

    const savePhotos = () => {
      localStorage.setItem('hasaniyya_photos', JSON.stringify(photos.value));
    };

    const openLightbox = (index) => {
      lightboxIndex.value = index;
      showLightbox.value = true;
    };

    const closeLightbox = () => {
      showLightbox.value = false;
    };

    const nextLightbox = () => {
      if (photos.value.length === 0) return;
      lightboxIndex.value = (lightboxIndex.value + 1) % photos.value.length;
    };

    const prevLightbox = () => {
      if (photos.value.length === 0) return;
      lightboxIndex.value = (lightboxIndex.value - 1 + photos.value.length) % photos.value.length;
    };

    const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        newPhotoUrl.value = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    const addPhoto = () => {
      if (!newPhotoTitle.value.trim()) {
        triggerToast('Photo title is required.', 'error');
        return;
      }
      if (!newPhotoUrl.value.trim()) {
        triggerToast('Please select a file to upload or enter a web URL.', 'error');
        return;
      }

      const newPhotoObj = {
        id: 'photo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
        title: newPhotoTitle.value.trim(),
        category: newPhotoCategory.value,
        description: newPhotoDescription.value.trim(),
        url: newPhotoUrl.value.trim(),
        date: new Date().toISOString()
      };

      photos.value.unshift(newPhotoObj);
      savePhotos();
      triggerToast(`"${newPhotoObj.title}" successfully added to the photo gallery!`, 'success');

      // Reset
      newPhotoTitle.value = '';
      newPhotoCategory.value = 'General';
      newPhotoDescription.value = '';
      newPhotoUrl.value = '';
      
      // Clear file input via value reset
      if (photoFileRef.value) {
        photoFileRef.value.value = '';
      }
    };

    const deletePhoto = (photoId) => {
      const idx = photos.value.findIndex(p => p.id === photoId);
      if (idx > -1) {
        const removedTitle = photos.value[idx].title;
        photos.value.splice(idx, 1);
        savePhotos();
        triggerToast(`"${removedTitle}" removed from the gallery.`, 'info');
        
        if (showLightbox.value) {
          if (photos.value.length === 0) {
            showLightbox.value = false;
          } else {
            lightboxIndex.value = Math.min(lightboxIndex.value, photos.value.length - 1);
          }
        }
      }
    };

    // Theme logic
    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      isDark.value = (savedTheme === 'dark');
      
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(savedTheme);
    };

    const toggleTheme = () => {
      isDark.value = !isDark.value;
      const themeName = isDark.value ? 'dark' : 'light';
      
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(themeName);
      localStorage.setItem('theme', themeName);
    };

    // Login logic
    const handleLogin = () => {
      loginError.value = '';
      if (loginEmail.value === 'manager@hasaniyya.com' && loginPassword.value === 'hasaniyya2026') {
        isAuthenticated.value = true;
        localStorage.setItem('hasaniyya_auth', 'true');
        triggerToast('Authentication successful! Welcome to the administrator terminal.', 'success');
        loginEmail.value = '';
        loginPassword.value = '';
        setView('manager');
      } else {
        loginError.value = 'Invalid manager email or security password.';
        triggerToast('Authentication failed.', 'error');
      }
    };

    const handleLogout = () => {
      isAuthenticated.value = false;
      localStorage.removeItem('hasaniyya_auth');
      triggerToast('Administrator session closed.', 'info');
      setView('home');
    };

    // Categories
    const categories = computed(() => {
      const order = ['Kids', 'LP Boys', 'LP Girls', 'UP Boys', 'UP Girls', 'HS Boys', 'HS Girls', 'General Boys', 'General Girls'];
      const cats = new Set();
      programs.value.forEach(p => cats.add(p.category));
      return order.filter(c => cats.has(c));
    });

    // Stats
    const stats = computed(() => {
      let totalStudents = 0;
      let totalCompleted = 0;
      const teamCounts = { 'al-noor': 0, 'al-fath': 0, 'al-buraq': 0 };
      const teamPlacePoints = { 'al-noor': 0, 'al-fath': 0, 'al-buraq': 0 };

      programs.value.forEach(prog => {
        totalStudents += prog.students.length;
        if (prog.status === 'Completed') {
          totalCompleted++;
        }

        prog.students.forEach(st => {
          if (teamCounts[st.teamId] !== undefined) {
            teamCounts[st.teamId]++;
          }
        });

        if (prog.status === 'Completed' && prog.result) {
          const firstStud = prog.students.find(s => s.id === prog.result.first);
          const secondStud = prog.students.find(s => s.id === prog.result.second);
          const thirdStud = prog.students.find(s => s.id === prog.result.third);

          if (firstStud && teamPlacePoints[firstStud.teamId] !== undefined) {
            teamPlacePoints[firstStud.teamId] += 10;
          }
          if (secondStud && teamPlacePoints[secondStud.teamId] !== undefined) {
            teamPlacePoints[secondStud.teamId] += 5;
          }
          if (thirdStud && teamPlacePoints[thirdStud.teamId] !== undefined) {
            teamPlacePoints[thirdStud.teamId] += 3;
          }
        }
      });

      const teamScores = {
        'al-noor': (teamCounts['al-noor'] * 1) + teamPlacePoints['al-noor'],
        'al-fath': (teamCounts['al-fath'] * 1) + teamPlacePoints['al-fath'],
        'al-buraq': (teamCounts['al-buraq'] * 1) + teamPlacePoints['al-buraq']
      };

      const sortedTeams = TEAMS.map(team => ({
        ...team,
        points: teamScores[team.id],
        participationCount: teamCounts[team.id],
        placePoints: teamPlacePoints[team.id]
      })).sort((a, b) => b.points - a.points);

      return {
        totalPrograms: programs.value.length,
        totalCompleted,
        totalRegistrations: totalStudents,
        teamCounts,
        teamScores,
        sortedTeams
      };
    });

    const getTeamInfo = (teamId) => {
      return TEAMS.find(t => t.id === teamId) || TEAMS[0];
    };

    const getStudentName = (prog, studentId) => {
      if (!prog || !studentId) return 'N/A';
      const student = prog.students.find(s => s.id === studentId);
      return student ? student.name : 'Unknown Candidate';
    };

    const getStudentClass = (prog, studentId) => {
      if (!prog || !studentId) return '';
      const student = prog.students.find(s => s.id === studentId);
      return student ? student.classLevel : '';
    };

    const getStudentTeamId = (prog, studentId) => {
      if (!prog || !studentId) return '';
      const student = prog.students.find(s => s.id === studentId);
      return student ? student.teamId : '';
    };

    // Registrations
    const openAddStudent = (program) => {
      selectedProgram.value = program;
      newStudentName.value = '';
      newStudentTeam.value = 'al-noor';
      newStudentClass.value = '';
      registerError.value = '';
      showAddStudentModal.value = true;
    };

    const submitStudent = () => {
      registerError.value = '';
      if (!newStudentName.value.trim()) {
        registerError.value = 'Student name cannot be empty.';
        return;
      }
      if (!newStudentClass.value.trim()) {
        registerError.value = 'Student class/grade cannot be empty.';
        return;
      }

      if (!selectedProgram.value) return;

      const program = programs.value.find(p => p.id === selectedProgram.value.id);
      if (program) {
        const newStudent = {
          id: 'stud-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
          name: newStudentName.value.trim(),
          teamId: newStudentTeam.value,
          classLevel: newStudentClass.value.trim(),
          registeredAt: new Date().toISOString()
        };

        program.students.push(newStudent);
        saveData();
        triggerToast(`${newStudent.name} registered to ${program.name}!`, 'success');
        
        showAddStudentModal.value = false;
        newStudentName.value = '';
        newStudentClass.value = '';
        
        if (showParticipantsModal.value && selectedProgram.value) {
          selectedProgram.value = { ...program };
        }
      }
    };

    const openParticipants = (program) => {
      selectedProgram.value = program;
      showParticipantsModal.value = true;
    };

    const removeStudent = (studentId) => {
      if (!selectedProgram.value) return;

      const program = programs.value.find(p => p.id === selectedProgram.value.id);
      if (program) {
        const studentIndex = program.students.findIndex(s => s.id === studentId);
        if (studentIndex > -1) {
          const removedName = program.students[studentIndex].name;
          
          if (program.result) {
            if (program.result.first === studentId) program.result.first = '';
            if (program.result.second === studentId) program.result.second = '';
            if (program.result.third === studentId) program.result.third = '';
            if (!program.result.first && !program.result.second && !program.result.third) {
              program.result = null;
              program.status = 'Pending';
            }
          }

          program.students.splice(studentIndex, 1);
          saveData();
          triggerToast(`${removedName} removed from program.`, 'info');
          selectedProgram.value = { ...program };
        }
      }
    };

    const updateProgramStatus = (programId, newStatus) => {
      const prog = programs.value.find(p => p.id === programId);
      if (prog) {
        prog.status = newStatus;
        if (newStatus !== 'Completed') {
          prog.result = null;
        }
        saveData();
        triggerToast(`Status updated to ${newStatus}`, 'success');
      }
    };

    const openManageResults = (program) => {
      selectedProgram.value = program;
      resultError.value = '';
      if (program.result) {
        resultFirst.value = program.result.first || '';
        resultSecond.value = program.result.second || '';
        resultThird.value = program.result.third || '';
      } else {
        resultFirst.value = '';
        resultSecond.value = '';
        resultThird.value = '';
      }
      showResultsModal.value = true;
    };

    const submitProgramResult = () => {
      resultError.value = '';
      if (!selectedProgram.value) return;

      const program = programs.value.find(p => p.id === selectedProgram.value.id);
      if (!program) return;

      if (!resultFirst.value) {
        resultError.value = 'First place candidate must be specified.';
        return;
      }

      if (resultFirst.value === resultSecond.value || resultFirst.value === resultThird.value || (resultSecond.value && resultSecond.value === resultThird.value)) {
        resultError.value = 'A student cannot occupy multiple placements.';
        return;
      }

      program.result = {
        first: resultFirst.value,
        second: resultSecond.value,
        third: resultThird.value
      };
      program.status = 'Completed';
      saveData();
      
      triggerToast(`Results published successfully for ${program.name}!`, 'success');
      showResultsModal.value = false;
      selectedProgram.value = { ...program };
    };

    const clearProgramResult = (programId) => {
      const prog = programs.value.find(p => p.id === programId);
      if (prog) {
        prog.result = null;
        prog.status = 'Ongoing';
        saveData();
        triggerToast('Results cleared.', 'info');
      }
    };

    // Backup & Restore
    const exportBackup = () => {
      const dataStr = JSON.stringify({
        version: '3.0',
        exportedAt: new Date().toISOString(),
        programs: programs.value,
        photos: photos.value
      }, null, 2);

      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `madrasathul_hasaniyya_sweet_mahabba_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast('Database backup file exported.', 'success');
    };

    const handleImportBackup = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (imported && Array.isArray(imported.programs)) {
            programs.value = imported.programs;
            saveData();
            if (Array.isArray(imported.photos)) {
              photos.value = imported.photos;
              savePhotos();
            }
            triggerToast('Database restored successfully from backup file!', 'success');
            if (selectedProgram.value) {
              const updated = programs.value.find(p => p.id === selectedProgram.value.id);
              if (updated) selectedProgram.value = { ...updated };
            }
          } else {
            triggerToast('Invalid backup format.', 'error');
          }
        } catch (err) {
          triggerToast('Error reading backup file. Must be valid JSON.', 'error');
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    };

    // Filtered lists
    const filteredProgramsByCategory = (category) => {
      let filtered = programs.value.filter(p => p.category === category);
      
      if (searchFilter.value.trim() !== '') {
        const query = searchFilter.value.toLowerCase().trim();
        filtered = filtered.filter(p => {
          const nameMatches = p.name.toLowerCase().includes(query);
          const studentMatches = p.students.some(s => s.name.toLowerCase().includes(query) || (s.classLevel && s.classLevel.toLowerCase().includes(query)));
          const teamMatches = TEAMS.some(t => t.name.toLowerCase().includes(query) && p.students.some(s => s.teamId === t.id));
          return nameMatches || studentMatches || teamMatches;
        });
      }
      
      return filtered;
    };

    const filteredCompletedPrograms = computed(() => {
      let completed = programs.value.filter(p => p.status === 'Completed' && p.result);
      if (searchFilter.value.trim() !== '') {
        const query = searchFilter.value.toLowerCase().trim();
        completed = completed.filter(p => {
          const nameMatches = p.name.toLowerCase().includes(query);
          const firstStudent = getStudentName(p, p.result.first).toLowerCase().includes(query);
          const secondStudent = getStudentName(p, p.result.second).toLowerCase().includes(query);
          const thirdStudent = getStudentName(p, p.result.third).toLowerCase().includes(query);
          return nameMatches || firstStudent || secondStudent || thirdStudent;
        });
      }
      return completed;
    });

    // Lifecycle hooks
    onMounted(() => {
      loadData();
      loadPhotos();
      initTheme();
      handleHashRoute();
      window.addEventListener('hashchange', handleHashRoute);
      setTimeout(() => {
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }, 50);
    });

    watch([isAuthenticated, showAddStudentModal, showParticipantsModal, showResultsModal, selectedProgram, currentView, managerSubView, showLightbox], () => {
      setTimeout(() => {
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }, 50);
    });

    return {
      currentView,
      managerSubView,
      setView,
      isAuthenticated,
      loginEmail,
      loginPassword,
      loginError,
      programs,
      photos,
      showLightbox,
      lightboxIndex,
      newPhotoTitle,
      newPhotoCategory,
      newPhotoDescription,
      newPhotoUrl,
      newPhotoSource,
      photoFileRef,
      openLightbox,
      closeLightbox,
      nextLightbox,
      prevLightbox,
      handlePhotoUpload,
      addPhoto,
      deletePhoto,
      isDark,
      searchFilter,
      selectedCategoryFilter,
      categories,
      TEAMS,
      stats,
      getTeamInfo,
      getStudentName,
      getStudentClass,
      getStudentTeamId,
      showAddStudentModal,
      showParticipantsModal,
      showResultsModal,
      selectedProgram,
      newStudentName,
      newStudentTeam,
      newStudentClass,
      registerError,
      resultFirst,
      resultSecond,
      resultThird,
      resultError,
      toastMessage,
      toastType,
      showToast,
      toggleTheme,
      handleLogin,
      handleLogout,
      openAddStudent,
      submitStudent,
      openParticipants,
      removeStudent,
      updateProgramStatus,
      openManageResults,
      submitProgramResult,
      clearProgramResult,
      exportBackup,
      handleImportBackup,
      filteredProgramsByCategory,
      filteredCompletedPrograms,
      triggerToast
    };
  }
}).mount('#root');
