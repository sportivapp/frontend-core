export default () => {
  return new Promise(function (resolve) {
    resolve({
      common: {
        login: 'Masuk',
        continue: 'Lanjutkan',
        login_title: 'Selamat datang kembali',
        login_subtitle: 'Silakan masuk untuk melanjutkan',
        register: 'Daftar',
        createOrganization: 'Buat Organisasi',
        myOrganization: 'Organisasi Saya',
        organization: 'Organisasi',
        followedOrganization: 'Organisasi yang Diikuti',
        select: 'Pilih',
        noOrganizationJoined: 'Anda belum bergabung dengan organisasi mana' +
            ' pun',
        seeAll: 'Lihat Semua',
        showMore: 'Tampilkan lebih banyak',
        category: 'Kategori:',
        signOut: 'Keluar',
        pageNotFound: 'Halaman Tidak Ditemukan',
        typeAgain: 'Coba ketik ulang URL atau kembali ke ',
        homePage: 'Homepage',
        underConsTitle: 'Eits! Kita lagi bikin sesuatu.',
        underConsMessage: 'Sabar ya, ini semua biar kamu bisa nikmatin' +
          ' Sportiv.',
        about: 'Tentang',
        booking: 'Pemesanan',
        class: 'Kelas',
        contact: 'Kontak',
        resetPassword: 'Atur Ulang Kata Sandi',
        forgotPassword: 'Lupa Kata Sandi',
        forum: 'Forum',
        logout: 'Keluar',
        news: 'Berita',
        team: 'Tim',
        tournament: 'Turnamen'
      },
      loginPage: {
        login: 'Masuk',
        email: 'Email',
        password: 'Kata Sandi',
        rememberMe: 'Ingat Saya',
        forgotPassword: 'Lupa Kata Sandi?',
        register: 'Daftar',
        notHaveAccount: 'Belum punya akun?'
      },
      registerPage: {
        register: 'Daftar',
        phone: 'No Telepon',
        email: 'Email',
        password: 'Kata Sandi',
        confirmPassword: 'Konfirmasi Kata Sandi',
        passwordHint: 'Minimal 8 karakter dengan huruf besar, angka, dan' +
            ' simbol.',
        agreeStart: 'Dengan mendaftar, Anda telah menyetujui  ',
        agreeMid: ' dan ',
        agreeEnd: ' Sportiv',
        legal: 'ketentuan',
        privacy: 'kebijakan privasi ',
        alreadyHaveAccount: 'Sudah punya akun?',
        login: 'Masuk',
        error: {
          EMAIL_INVALID: 'Email tidak valid',
          USER_ALREADY_EXIST: 'User sudah terdaftar',
          OTP_NOT_FOUND: 'Kode OTP tidak ditemukan, mohon coba lagi',
          OTP_CODE_NOT_MATCH: 'Kode OTP tidak benar'
        }
      },
      registerOtp: {
        title: 'Verifikasi Email',
        guide: 'Masukan kode OTP yang dikirimkan \n' +
            'ke email Anda disini',
        sendAgain: 'Kirim Ulang Kode OTP',
        verify: 'Verifikasi',
        error: {
          EMAIL_INVALID: 'Email tidak valid',
          EMAIL_EXISTED: 'Email sudah terdaftar',
          OTP_PENDING: 'Terlalu banyak verifikasi, coba lagi beberapa saat kemudian',
          OTP_CONFIRMED: 'Kode OTP sudah terpakai',
          OTP_EXPIRED: 'Kode OTP sudah expired'
        }
      },
      forgotPasswordPage: {
        forgotTitle: 'Lupa Kata Sandi',
        guide: 'Masukan email yang Anda gunakan dan kami akan mengirimkan' +
            ' link untuk mereset password Anda',
        email: 'Email',
        send: 'Kirim',
        back: 'Kembali ke Sign In'
      },
      resetPasswordPage: {
        title: 'Reset Kata Sandi',
        password: 'Kata Sandi',
        passwordHint: 'Minimal 8 karakter dengan huruf besar, angka, dan' +
            ' simbol.',
        confirmPassword: 'Konfirmasi Kata Sandi',
        save: 'Simpan'
      },
      createOrganization: {
        name: 'Nama Organisasi',
        email: 'Email Organisasi',
        phone: 'Nomor Telepon',
        address: 'Alamat',
        industry: 'Industri',
        country: 'Negara',
        state: 'Provinsi',
        register: 'Daftar',
        error: {
          INDUSTRY_NOT_PROVIDED: 'Industri tidak boleh kosong',
          INDUSTRY_NOT_FOUND: 'Industri tidak ditemukan',
          PARENT_NOT_FOUND: 'Parent company tidak ditemukan',
          USER_NOT_IN_COMPANY: 'User tidak dalam company'
        }
      },
      news: {
        recentNews: 'Berita Terbaru',
        otherNews: 'Berita Lainnya',
        seen: 'Telah dilihat sebanyak {count} kali',
        copy: 'Salin link',
        share: 'SALIN LINK',
        relatedNews: 'Berita Terkait',
        emptyTitle: 'Oops, lagi gaada berita nih',
        emptySubTitle: 'Cari yang lain aja dulu',
        readNow: 'Baca Sekarang',
        successCopy: 'Link Berhasil Disalin',
        failCopy: 'Gagal menyalin link, silahkan coba lagi'
      },
      tournament: {
        title: 'Turnamen',
        sportivTournament: 'Sportiv Turnamen',
        appBarSubtitle: 'Buat dan atur semua turnamen dengan mudah dalam satu tempat.',
        createTournament: 'Buat Turnamen',
        manageTournament: 'Atur Turnamen'
      },
      organization: {
        organizationPartner: 'Mitra Organisasi',
        organizationTitle: 'Dipercaya oleh Organisasi World Wide',
        organizationBody: 'Kami bekerja dengan 50 merek untuk membuat kampanye komunikasi atau kemitraan yang disesuaikan untuk komunitas olahraga amatir kami.'
      },
      homeFooter: {
        title: 'Download App Sportiv Sekarang',
        subTitle: 'Dengan kemudahan akses dan penawaran ekslusif',
        product: 'Produk',
        organization: 'Organisasi',
        team: 'Tim',
        forum: 'Forum',
        class: 'Kelas',
        tournament: 'Turnamen',
        booking: 'Booking',
        company: 'SPORTIV',
        aboutUs: 'Tentang Kami',
        contactUs: 'Hubungi Kami',
        followUs: 'Ikuti Kami',
        motto: 'Sport at Your Fingertips',
        termOfServices: 'Syarat dan ketentuan',
        privacyPolicy: 'Kebijakan Privasi'
      },
      aboutUs: {
        title: 'Tentang Kami',
        headings: 'Sport at your fingertips',
        subtitle: 'Sportiv adalah cara termudah untuk melakukan aktivitas olahraga dan meningkatkannya.',
        aboutInfoLeftParagraph: 'Sportiv adalah platform yang mengintegrasikan para pemain, komunitas, pelatih, dan lapangan olahraga sebagai ekosistem yang akan membantu proses kegiatan olahraga untuk meningkatkan gaya hidup sehat yang dimulai dari kebiasaan hingga menjadi atlet unggulan.',
        aboutInfoRightParagraph: 'Kita dapat meningkatkan cara melihat apa yang dapat kita lakukan melalui olahraga dengan menggunakan Sportiv. Hal ini tidak hanya untuk membuat Anda lebih sehat, tetapi juga akan meningkatkan gaya hidup Anda melalui komunitas dan membuat pencapaian lain secara global.',
        featureText: 'Fitur',
        featureTitle: 'Fitur Kami',
        featureSubtitle: 'Beragam fitur menarik untuk memudahkanmu berolahraga',
        visiMisiList: [
          {
            id: 1,
            img: require('@/assets/images/bg/visi.png'),
            alt: 'visi',
            title: 'Visi',
            subtitle: 'Menciptakan gaya hidup olahraga yang baru.'
          },
          {
            id: 2,
            img: require('@/assets/images/bg/misi.png'),
            alt: 'misi',
            title: 'Misi',
            subtitle: 'Menciptakan media dan standar penilaian kegiatan olahraga melalui teknologi.'
          }
        ],
        cardList: [
          {
            id: 1,
            img: require('@/assets/images/icons/organisasi.png'),
            alt: 'Organisasi',
            title: 'Organisasi',
            subtitle: 'Temukan dan ikuti organisasi olahraga yang kamu minati.'
          },
          {
            id: 2,
            img: require('@/assets/images/icons/turnamen.png'),
            alt: 'Turnamen',
            title: 'Turnamen',
            subtitle: 'Daftar dan ikuti pertandingan olahraga dengan mudah hanya di Turnamen.'
          },
          {
            id: 3,
            img: require('@/assets/images/icons/tim.png'),
            alt: 'Tim',
            title: 'Tim',
            subtitle: 'Gabung ke dalam tim olahraga sesuai dengan minatmu.'
          },
          {
            id: 4,
            img: require('@/assets/images/icons/forum.png'),
            alt: 'Forum',
            title: 'Forum',
            subtitle: 'Wadah berdiskusi mengenai topik olahraga yang paling menarik untukmu.'
          }
        ]
      }
    })
  })
}
