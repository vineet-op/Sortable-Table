export interface DataItemProps {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'inactive' | 'pending';
}

export const dummyData: DataItemProps[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'active'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'inactive'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'pending'
    },
    {
        id: 4,
        name: 'Emily Brown',
        email: 'emily.brown@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'active'
    },
    {
        id: 5,
        name: 'David Wilson',
        email: 'david.wilson@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'inactive'
    },
    {
        id: 6,
        name: 'Sarah Lee',
        email: 'sarah.lee@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'pending'
    },
    {
        id: 7,
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'active'
    },
    {
        id: 8,
        name: 'Emma Taylor',
        email: 'emma.taylor@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'inactive'
    },
    {
        id: 9,
        name: 'Chris Martin',
        email: 'chris.martin@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'pending'
    },
    {
        id: 10,
        name: 'Olivia Garcia',
        email: 'olivia.garcia@example.com',
        createdAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        updatedAt: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: 'active'
    }
];
