export default () => {
  return new Promise(function (resolve) {
    resolve({
      common: {
        login: 'Login',
        continue: 'Continue',
        login_title: 'Welcome back',
        login_subtitle: 'Please login to continue',
        register: 'Register',
        createOrganization: 'Create Organization',
        myOrganization: 'My Organization',
        organization: 'Organization',
        followedOrganization: 'Followed Organization',
        select: 'Select',
        noOrganizationJoined: "You haven't joined any organization yet",
        seeAll: 'See All',
        showMore: 'Show more',
        category: 'Category:',
        signOut: 'Sign Out',
        pageNotFound: 'Page Not Found',
        typeAgain: 'Try retyping the URL or returning to ',
        homePage: 'Homepage',
        underConsTitle: 'Eits! We\'re making something.',
        underConsMessage: 'Please be patient, all of this so you can enjoy' +
          ' Sportiv.',
        about: 'About',
        booking: 'Booking',
        class: 'Class',
        contact: 'Contact',
        resetPassword: 'Reset Password',
        forgotPassword: 'Forgot Password',
        forum: 'Forum',
        logout: 'Logout',
        news: 'News',
        team: 'Team',
        myTeam: 'My Team',
        createTeam: 'Create Team',
        tournament: 'Tournament',
        faq: 'FAQ',
        dataNotAvailable: 'Data not available',
        day: 'day',
        month: 'month',
        year: 'year',
        description: 'Description'
      },
      loginPage: {
        login: 'Log In',
        email: 'Email',
        password: 'Password',
        rememberMe: 'Remember Me',
        forgotPassword: 'Forgot Password?',
        register: 'Register',
        notHaveAccount: 'Not have account?'
      },
      registerPage: {
        register: 'Register',
        phone: 'Phone Number',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        passwordHint: 'Must contain 8 characters with capital letter,' +
            ' numbers, and, symbol.',
        agreeStart: 'By registering, you have agreed to Sportiv\'s',
        agreeMid: 'and ',
        agreeEnd: '',
        legal: 'clause',
        privacy: 'privacy policy ',
        alreadyHaveAccount: 'Already have account?',
        login: 'Log in',
        error: {
          EMAIL_INVALID: 'Email invalid',
          USER_ALREADY_EXIST: 'User already registered',
          OTP_NOT_FOUND: 'OTP code not found, please try again',
          OTP_CODE_NOT_MATCH: 'OTP Code does not match'
        }
      },
      registerOtp: {
        title: 'Verifikasi Email',
        guide: 'Masukan kode OTP yang dikirimkan \n' +
            'ke email Anda disini',
        sendAgain: 'Kirim Ulang Kode OTP',
        verify: 'Verifikasi',
        error: {
          EMAIL_INVALID: 'Invalid Email',
          EMAIL_EXISTED: 'Email already registered',
          OTP_PENDING: 'Too many otp request try again later',
          OTP_CONFIRMED: 'OTP code already used, please try again',
          OTP_EXPIRED: 'OTP code already expired'
        }
      },
      forgotPasswordPage: {
        forgotTitle: 'Forgot Password',
        guide: 'Enter the email you used and we will send you a link to' +
            ' reset your password',
        email: 'Email',
        send: 'Send',
        back: 'Back to Sign In'
      },
      resetPasswordPage: {
        title: 'Reset Password',
        password: 'Password',
        passwordHint: 'Must contain 8 characters with capital letter,' +
            ' numbers, and, symbol.',
        confirmPassword: 'Confirm Password',
        save: 'Save'
      },
      createOrganization: {
        name: 'Organization\'s Name',
        email: 'Organization\'s Email',
        phone: 'Phone Number',
        address: 'Address',
        industry: 'Industry',
        country: 'Country',
        state: 'Province',
        register: 'Register',
        error: {
          INDUSTRY_NOT_PROVIDED: 'Industry must be provided',
          INDUSTRY_NOT_FOUND: 'Industry not found',
          PARENT_NOT_FOUND: 'Parent company not found',
          USER_NOT_IN_COMPANY: 'User is not in company'
        }
      },
      news: {
        recentNews: 'Latest News',
        otherNews: 'Other News',
        seen: 'Viewed {count} times',
        copy: 'Copy link',
        share: 'COPY LINK',
        relatedNews: 'Related News',
        emptyTitle: 'Oops, there\'s no news',
        emptySubTitle: 'Look for the others first',
        readNow: 'Read Now',
        successCopy: 'Successfully Copied Link',
        failCopy: 'Failed to copy link, please try again'
      },
      tournament: {
        title: 'Tournament',
        sportivTournament: 'Sportiv Tournament',
        appBarSubtitle: 'Create and organize all tournaments easily in one place.',
        createTournament: 'Create Tournament',
        manageTournament: 'Manage Tournament',
        emptyTitle: 'Oops, there\'s no tournament',
        emptySubTitle: 'Look for the others first',
        findTournament: 'Find Tournament',
        finished: 'Finished',
        onGoing: 'On Going',
        upComing: 'Up Coming',
        openRegistration: 'Open Registration',
        team: 'Team',
        sort: 'Sort',
        priceFree: 'Free',
        sorts: [
          {
            id: 'OLDEST',
            text: 'Oldest'
          },
          {
            id: 'NEWEST',
            text: 'Newest'
          }
        ],
        selectFilter: 'Select Filter',
        fee: [
          {
            id: 'ALL',
            text: 'All'
          },
          {
            id: 'FREE',
            text: 'Free'
          },
          {
            id: 'PAID',
            text: 'Paid'
          }
        ],
        registrationFee: 'Registration Fee',
        location: 'Location',
        tournamentDate: 'Tournament Date',
        organizer: 'Organizer',
        readNow: 'Read Now',
        emptyParticipants: 'There are no registered participants yet',
        emptyParticipantsSub: 'Register your team now',
        tournamentSeeAll: 'See All Tournaments'
      },
      organization: {
        organizationPartner: 'Organization Partner',
        organizationTitle: 'Trusted by Organization World Wide',
        organizationBody: 'We work with 50 brands to create communication campaigns or partnerships customized for our amateur sports community.'
      },
      homeFooter: {
        title: 'Download Sportiv App Now',
        subTitle: 'With easy access and exclusive offers',
        product: 'Product',
        organization: 'Organization',
        team: 'Team',
        forum: 'Forum',
        class: 'Class',
        tournament: 'Tournament',
        booking: 'Booking',
        company: 'SPORTIV',
        aboutUs: 'About Us',
        contactUs: 'Contact Us',
        followUs: 'Follow Us',
        motto: 'Sport at Your Fingertips',
        termOfServices: 'Term of Services',
        privacyPolicy: 'Privacy Policy',
        help: 'Help',
        faq: 'FAQ'
      },
      aboutUs: {
        title: 'About Us',
        headings: 'Sport at your fingertips',
        subtitle: 'Sportiv is the simplest way to do sports activities happened and improved.',
        aboutInfoLeftParagraph: 'Sportiv is a platform that integrated sports players, communities, coaches, and courts as an ecosystem that will help the process of sports activities to improve a healthy lifestyle that starts from a habit until becoming an excellent athlete.',
        aboutInfoRightParagraph: 'We can improve the way we see what we can do through sport by using Sportiv. It’s not just to make you healthier, but it will improve your life style through communities and create another accomplishment globally.',
        featureText: 'Features',
        featureTitle: 'Our Features',
        featureSubtitle: 'Various interesting features to make you easier to do exercise',
        visiMisiList: [
          {
            id: 1,
            img: require('@/assets/images/bg/visi.png'),
            alt: 'vision',
            title: 'Vision',
            subtitle: 'Create a new lifestyle of sports.'
          },
          {
            id: 2,
            img: require('@/assets/images/bg/misi.png'),
            alt: 'mission',
            title: 'Mission',
            subtitle: 'Create a medium and assessment standards of sports activities through technology.'
          }
        ],
        cardList: [
          {
            id: 1,
            img: require('@/assets/images/icons/organisasi.png'),
            alt: 'Organization',
            title: 'Organization',
            subtitle: 'Find and follow sports organizations that interest you.'
          },
          {
            id: 2,
            img: require('@/assets/images/icons/turnamen.png'),
            alt: 'Tournament',
            title: 'Tournament',
            subtitle: 'Register and participate in sports competition easily only in Tournaments.'
          },
          {
            id: 3,
            img: require('@/assets/images/icons/tim.png'),
            alt: 'Team',
            title: 'Team',
            subtitle: "Let's join a sports team according to your interests."
          },
          {
            id: 4,
            img: require('@/assets/images/icons/forum.png'),
            alt: 'Forum',
            title: 'Forum',
            subtitle: 'A place to discuss the most interesting sports topics just for you.'
          }
        ]
      },
      contactUs: {
        title: 'Contact Us',
        headings: 'How can we help you?',
        subTitle: 'We will help answer all your questions and needs. Contact us now.',
        emailNow: 'Email Now',
        whatsAppNow: 'WhatsApp Now',
        callCenter: 'Call Center'
      },
      home: {
        trustedByTitle: 'Trusted by National Organizations',
        trustedBySubTitle: 'National sports organizations trust Sportiv to collaborate to broaden the sports community.'
      },
      cmsClass: {
        classDetail: 'Class Detail',
        classCategory: 'Class Category',
        sportType: 'Sport Type',
        participants: 'Participants',
        personInCharge: 'PIC',
        personInChargePhone: 'PIC Contact',
        coach: 'Coach',
        location: 'Location',
        showMore: 'Show more',
        searchParticipants: 'Search participants',
        classFee: 'Fee',
        deleteModalTitle: 'Delete Class',
        deleteAction: 'Delete',
        deleteCancel: 'Cancel',
        deleteMessage: 'Are you sure you want to delete this class now?',
        deleteSuccess: 'Success delete class',
        categoryDeleteModalTitle: 'Delete Class Category',
        categoryDeleteMessage: 'Are you sure you want to delete this category now?',
        categoryDeleteSuccess: 'Success delete class category'
      },
      userClass: {
        createClassCancelModalTitle: 'Cancel create class?',
        createClassCancelMessage: 'Inputed data not saved',
        cancelCancel: 'No',
        cancelAction: 'Cancel',
        createClassSaveModalTitle: 'Add class?',
        createClassSaveMessage: 'With This you will create a new class',
        saveAction: 'Add'
      }
    })
  })
}
