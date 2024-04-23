const stories = [
    {
        id: 1,
        category: "food",
        bookedMarked: true,
        bookedMarkedBy: 6789,
        data: [
            {
                title: "Delicious Pasta Dish",
                subTitle: "Enjoyed a delightful pasta meal with friends!",
                img: "https://placehold.it/600x400",
                id: 1
            },
            {
                title: "Morning Coffee",
                subTitle: "Starting the day right with a cup of freshly brewed coffee.",
                img: "https://placehold.it/600x400",
                id: 2
            }
        ]
    },
    {
        id: 2,
        category: "movie",
        bookedMarked: true,
        bookedMarkedBy: 6789,
        data: [
            {
                title: "Movie Night Out",
                subTitle: "Caught the latest blockbuster with friends!",
                img: "https://placehold.it/600x400",
                id: 1
            },
            {
                title: "Classic Movie Marathon",
                subTitle: "Revisited some all-time favorite films at home.",
                img: "https://placehold.it/600x400",
                id: 2
            }
        ]
    },
    {
        id: 3,
        category: "food",
        bookedMarked: true,
        bookedMarkedBy: 1234,
        data: [
            {
                title: "Fitness Journey",
                subTitle: "Feeling motivated after a great workout session!",
                img: "https://placehold.it/600x400",
                id: 1
            },
            {
                title: "Home Decor Ideas",
                subTitle: "Redecorating the living room with some new furnishings.",
                img: "https://placehold.it/600x400",
                id: 2
            }
        ]
    },
    {
        id: 4,
        category: "travel",
        bookedMarked: false,
        bookedMarkedBy: null,
        data: [
            {
                title: "Beach Vacation",
                subTitle: "Enjoying sun, sand, and surf at a tropical destination!",
                img: "https://placehold.it/600x400",
                id: 1
            },
            {
                title: "City Exploration",
                subTitle: "Discovering hidden gems in a bustling metropolis.",
                img: "https://placehold.it/600x400",
                id: 2
            }
        ]
    }
];


const getStoryByCategory = () => {
    const res = stories.filter(item => item.id == 2);
    console.log(res);
}

getStoryByCategory();