import { faker } from '@faker-js/faker'
import User from '../Model/userModel.mjs'
import catchAsync from '../utils/catchAsync.mjs'

const createTestUser = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        displayName: faker.person.fullName(),
        gender: faker.person.sex(),
        phone: faker.phone.number('##########'),
        dob: faker.date.birthdate({ min: 18, max: 40, mode: 'age' }),
        personalInfo: {
            religion: faker.helpers.arrayElement(['Islam', 'Christian', 'Hindu']),
            caste: faker.helpers.arrayElement(['Sunni', 'Shia', 'Nair', 'Ezhava', 'Orthodox', 'Syro Malabar Catholic',]),
            maritalStatus: faker.helpers.arrayElement(['Unmarried, ', 'Divorced', 'Widow / Widower', 'Separated']),
            height: faker.number.float({ min: 100, max: 200, precision: 0.1 }),
            weight: faker.number.float({ min: 40, max: 100, precision: 0.1 }),
            bodyType: faker.helpers.arrayElement(['Slim', 'Athletic', 'Average', 'Plus Size']),
            drinkingHabits: faker.helpers.arrayElement(['Yes', 'No', 'Occassionally']),
            smokingHabits: faker.helpers.arrayElement(['Yes', 'No', 'Occassionally']),
            financialStatus: faker.helpers.arrayElement([
                'Average', "Middle Class", 'Rich', 'HNI (High Net-worth)'
            ])
        },
        occupation: {
            hasJob: faker.helpers.arrayElement(['Yes', 'No']),
            country: faker.helpers.arrayElement(['India', 'UAE', 'USA', 'Canada']),
            state: faker.location.state(),
            city: faker.location.city(),
            annualIncome: faker.helpers.arrayElement[
                'Less than 01 Lakh', '01 - 03 Lakh', '03 - 06 Lakh', '06 - 12 Lakh', '12 - 24 Lakh', '24 - 36 Lakh', '36 - 48 Lak',
                '48 - 60 Lakh', '60 lakh - 1 Cr'
            ],
            designation: faker.person.jobTitle(),
            stream: faker.person.jobArea(),
            companyName: faker.company.name()
        },
        native: {
            district: faker.location.city(),
            state: faker.location.state(),
            country: 'India',
            motherTounge: faker.helpers.arrayElement(['Malayalam', 'Kannada', 'Tamil', 'Hindi', 'English'])
        },
        academic: {
            pursueAny: faker.helpers.arrayElement(['Yes', 'No']),
            academicStream: faker.person.jobArea(),
            courseName: faker.helpers.arrayElement(['B.Com', 'BBA', 'MBBS', 'BCA', 'B-Tech', 'Para Medical', 'MBA']),
            university: faker.helpers.arrayElement(['Kerala University', 'Delhi University', 'Jawaharlal Nehru university', 'Xyz University']),
            passOut: faker.date.between({ from: '2000-01-01T00:00:00.000Z', to: '2023-05-01T00:00:00.000Z' })
        },
        family: {
            fatherName: faker.person.fullName({ sex: 'male' }),
            motherName: faker.person.fullName({ sex: 'female' }),
            houseName: faker.location.streetAddress(),
            pincode: faker.location.zipCode('######')
        },
        preferenceData: {
            age: faker.number.int({ min: 18, max: 40 }),
            height: faker.number.float({ min: 100, max: 200, precision: 0.1 }),
            caste: faker.helpers.arrayElement(['Sunni', 'Shia', 'Nair', 'Ezhava', 'Orthodox', 'Syro Malabar Catholic',]),
            maritalStatus: faker.helpers.arrayElement(['Unmarried, ', 'Divorced', 'Widow / Widower', 'Separated'])
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