import { faker } from '@faker-js/faker'
import User from '../Model/userModel.mjs'
import catchAsync from '../utils/catchAsync.mjs'

const religions = ['Islam', 'Christian', 'Hindu'];
const IslamCaste = ['Sunni', 'Shia',]
const HinduCaste = ['Nair', 'Ezhava']
const ChristianCaste = ['Orthodox', 'Catholic']

const indiaStates = ['Kerala', 'Tamilnadu', 'Karnadaka',]
const KeralaDistricts = ['Kozhikode', 'Thiruvananthapuram', 'Thrissur', 'Ernakulam']
const TamilnaduDistricts = ['Salem', 'Coimbatore', 'Madurai', 'Thoothikudi']
const KarnadakaDistricts = ['Bengaluru Urban', 'Bellari', 'Kodagu', 'Mysuru']
const KeralaCities = ['Kochi', 'Kozhikode', 'Thiruvananthapuram',]
const TamilnaduCities = ['Chennai', 'Coimbatore', 'Madurai']
const KarnadakaCities = ['Bengaluru', 'Mysuru', 'Mangaluru']

const academicStreams = ['Business', 'IT', 'Medical']
const businessCourses = ['BBA', 'MBA', 'Economics']
const itCourses = ['BCA', 'Computer Science', 'MCA']
const medicalCourses = ['BDS', 'MBBS', 'Nursing']

const occupationStreams = ['Business', 'IT', 'Medical', 'Education']
const businessDesignations = ['CEO', 'Manager', 'Sales Exicutive']
const medicalDesignations = ['Doctor', 'Nurse', 'Pharmacist']
const itDesignations = ['Software Engineer', 'Web Designer', 'CEO']
const educationDesignation = ['Teacher', 'Professor', 'Manager']

const selectReligion = () => religions[Math.floor(Math.random() * 3)]
const selectCaste = (religion) => {
    switch (religion) {
        case 'Islam':
            return IslamCaste[Math.floor(Math.random() * 2)]
        case 'Christian':
            return ChristianCaste[Math.floor(Math.random() * 2)]
        case 'Hindu':
            return HinduCaste[Math.floor(Math.random() * 2)]
    }
}

const selectState = () => indiaStates[Math.floor(Math.random() * 3)];
const selectDistrict = (state) => {
    switch (state) {
        case "Kerala":
            return KeralaDistricts[Math.floor(Math.random() * 4)];
        case "Tamilnadu":
            return TamilnaduDistricts[Math.floor(Math.random() * 4)];
        case "Karnadaka":
            return KarnadakaDistricts[Math.floor(Math.random() * 4)];
    }
}
const selectCity = (state) => {
    switch (state) {
        case "Kerala":
            return KeralaCities[Math.floor(Math.random() * 3)];
        case "Tamilnadu":
            return TamilnaduCities[Math.floor(Math.random() * 3)];
        case "Karnadaka":
            return KarnadakaCities[Math.floor(Math.random() * 3)];
    }
}

const selectAcademicStream = () => academicStreams[Math.floor(Math.random() * 3)]
const selectCourse = (stream) => {
    switch (stream) {
        case 'Medical':
            return medicalCourses[Math.floor(Math.random() * 3)]
        case 'IT':
            return itCourses[Math.floor(Math.random() * 3)]
        case 'Business':
            return businessCourses[Math.floor(Math.random() * 3)]
    }
}

const selectOccupationStream = () => occupationStreams[Math.floor(Math.random() * 4)]
const selectDesination = (stream) => {
    switch (stream) {
        case 'Business':
            return businessDesignations[Math.floor(Math.random() * 3)]
        case 'Medical':
            return medicalDesignations[Math.floor(Math.random() * 3)]
        case 'IT':
            return itDesignations[Math.floor(Math.random() * 3)]
        case 'Education':
            return educationDesignation[Math.floor(Math.random() * 3)]
    }
}

const selectMinAge = (gender) =>
    gender === 'female' ?
        Math.floor(Math.random() * (35 - 21 + 1)) + 21
        : Math.floor(Math.random() * (35 - 18 + 1)) + 18;

const selectMinHeight = () =>
    Math.floor(Math.random() * (190 - 110 + 1) + 110)

const createTestUser = () => {

    const gender = faker.helpers.arrayElement(['male', 'female'])
    const religion = selectReligion();
    const caste = selectCaste(religion);
    const minAge = selectMinAge(gender);
    const maxAge = minAge + 5;
    const minHeight = selectMinHeight();
    const maxHeight = minHeight + 10;
    const nativeState = selectState();
    const district = selectDistrict(nativeState);
    const occupationState = selectState()
    const occupationCity = selectCity(occupationState)
    const occupationStream = selectOccupationStream()
    const designation = selectDesination(occupationStream)
    const academicStream = selectAcademicStream();
    const courseName = selectCourse(academicStream)

    return {
        _id: faker.database.mongodbObjectId(),
        displayName: faker.person.fullName(),
        gender: gender,
        phone: faker.phone.number('##########'),
        dob: faker.date.birthdate({ min: minAge, max: 40, mode: 'age' }),
        personalInfo: {
            religion: religion,
            caste: caste,
            maritalStatus: faker.helpers.arrayElement(['Unmarried', 'Divorced', 'Widow / Widower',]),
            height: faker.number.float({ min: 100, max: 200, precision: 0.1 }),
            weight: faker.number.float({ min: 40, max: 100, precision: 0.1 }),
            bodyType: faker.helpers.arrayElement(['Slim', 'Athletic', 'Average', 'Plus Size']),
            financialStatus: faker.helpers.arrayElement([
                'Average', "Middle Class", 'Rich', 'HNI (High Net-worth)'
            ])
        },
        occupation: {
            hasJob: faker.helpers.arrayElement(['Yes', 'No']),
            country: 'India',
            state: occupationState,
            city: occupationCity,
            annualIncome: faker.helpers.arrayElement([
                'Less than 01 Lakh', '01 - 03 Lakh', '03 - 06 Lakh', '06 - 12 Lakh', '12 - 24 Lakh', '24 - 36 Lakh', '36 - 48 Lak', '48 - 60 Lakh', '60 lakh - 1 Cr'
            ]),
            stream: occupationStream,
            designation: designation,
            companyName: faker.company.name()
        },
        native: {
            country: 'India',
            state: nativeState,
            district: district,
        },
        academic: {
            pursueAny: faker.helpers.arrayElement(['Yes', 'No']),
            academicStream: academicStream,
            courseName: courseName,
            university: faker.helpers.arrayElement(['ABC University', 'MM University', 'JK university', 'XYZ University']),
            passOut: faker.date.between({ from: '2000-01-01T00:00:00.000Z', to: '2023-05-01T00:00:00.000Z' })
        },
        family: {
            fatherName: faker.person.fullName({ sex: 'male' }),
            motherName: faker.person.fullName({ sex: 'female' }),
            houseName: faker.location.streetAddress(),
            pincode: faker.location.zipCode('######')
        },
        preferenceData: {
            age: {
                minAge: minAge,
                maxAge: maxAge,
            },
            height: {
                minHeight: minHeight,
                maxHeight: maxHeight,
            },
            caste: caste,
            maritalStatus: faker.helpers.arrayElement(['Unmarried', 'Divorced']),
            location: faker.helpers.arrayElements([...KeralaDistricts, ...TamilnaduDistricts, ...KarnadakaDistricts], { min: 1, max: 3 }),
            qualification: faker.helpers.arrayElements(['Business', 'IT', 'Medical'], { min: 1, max: 3 }),
            occupation: faker.helpers.arrayElements(['Business', 'IT', 'Medical', 'Education'], { min: 1, max: 3 }),
        },
    }
}

export const createTestUsers = () => new Promise((resolve, reject) => {
    let users = [];
    for (let i = 1; i <= 1000; i++) {
        let user = createTestUser()
        users.push(user)
    }
    resolve(users)
})

export const createRndomTestUsers = catchAsync(async (req, res) => {
    const users = await createTestUsers();
    await User.insertMany(users)
    res.status(200).json({ users })
})

export const deleteTestUsers = catchAsync(async (req, res) => {
    await User.deleteMany({})
    res.sendStatus(200)
})