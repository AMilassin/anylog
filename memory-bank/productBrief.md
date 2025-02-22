Overview:
Anylog is a highly customizable logging application designed to help users track various aspects of their daily lives. The system is built around three core components: Categories, Items, and Fields, allowing for structured and flexible data entry.

Core Categories
Activity: Encompasses actions performed by the user, including physical, cognitive, and work-related tasks.
Examples: Running, Meditation, Sleep, Work.

Status: Tracks emotional, mental, and physical states over time.
Examples: Stress, Anxiety, Pain, Happiness.

Supplement & Medication: Records consumption of functional or medicinal substances.
Examples: Vitamin D, Aspirin.

Food: Logs solid food intake.
Examples: Chicken Breast, Apple, Fried Eggs.

Drink: Monitors liquid consumption.
Examples: Water, Coffee, Juice.

Event: Captures time-based occurrences with optional descriptions.
Examples: Workout Start, Waking Up, Dream, Panic Attack.

Apologies for the earlier oversight, Tamas. The key features of Anylog are as follows:

Customizable Data Logging: Users can define their own items and the fields they want to track, allowing for personalized and flexible data entry.

Automated Time Tracking: Time-based logs (e.g., "Workout Start," "Bedtime," "Waking Up") automatically store timestamps, ensuring accurate tracking of events.

Modular Categories: The application supports a wide range of activities, emotions, and health metrics through its flexible category system.

Flexible Measurement Units: Different field types support numerical values, scales, text entries, and predefined options, enabling users to select or define units that best suit their logging preferences.

Health & Lifestyle Insights: By combining emotional and physical status tracking, users can gain a comprehensive understanding of their behavioral patterns and overall well-being.

---------------------------------------
example items definition
1. Activity

Item	Field Name	Type	Unit
Running	Distance	Float	Kilometers
Duration	Integer	Minutes
Intensity	FloatScale10	-
Meditation	Duration	Integer	Minutes
Technique	String	-
Sleep	Duration	Float	Hours
Notes	String	-
Reading	Book Title	String	-
Author	String	-
Pages Read	Integer	Pages
Work	Task Type	String	-
Duration	Integer	Minutes
Productivity Level	FloatScale10	-
2. Status

Item	Field Name	Type	Unit
Anxiety	Level	FloatScale10	-
Notes	String	-
Pain	Intensity	FloatScale10	-
Location	String	-
Happiness	Level	FloatScale10	-
Notes	String	-
Stress	Level	FloatScale10	-
Notes	String	-
3. Supplement & Medication

Item	Field Name	Type	Unit
Vitamin D	Dosage	Integer	IU
Form	String	-
Aspirin	Dosage	Float	mg
Form	String	-
4. Food

Item	Field Name	Type	Unit
Fried Eggs	Quantity	Integer	Pieces
Chicken Breast	Weight	Integer	Grams
5. Drink

Item	Field Name	Type	Unit
Water	Volume	Float	Deciliters
Coffee	Quantity	Integer	Cups
Notes	String	-
6. Event

Item	Field Name	Type	Unit
Workout Start	Timestamp	Auto	-
Notes	String	-
Bedtime	Timestamp	Auto	-
Notes	String	-
Waking Up	Timestamp	Auto	-
Notes	String	-
Dream	Timestamp	Auto	-
Description	String	-
Notes:

Type: Specifies the data format (e.g., Integer, Float, String, FloatScale10).
Unit: Indicates the measurement unit for the field, if applicable.
FloatScale10: Represents a floating-point number on a scale from 1 to 10.
Auto: Denotes fields automatically populated by the system, such as timestamps.
By defining both the type and unit for each field during item creation, Anylog ensures that all entries are consistent and meaningful, facilitating accurate tracking and analysis of user data.


--------------------------------------------------------------------------------

Example Workflow: Defining and Logging a Custom Activity
Scenario: A user, Alex, wants to track their yoga sessions, including details such as duration, type of yoga, and perceived intensity.

Steps:

Accessing the Application:

Alex opens the Anylog app and navigates to the dashboard.
Navigating to Customization Settings:

From the dashboard, Alex selects the "Customize" option to define a new activity.
Creating a New Item:

Within the "Customize" section, Alex chooses to add a new Item under the Activity category.
Alex names this item "Yoga Session."
Defining Fields for the Item:

After creating "Yoga Session," Alex defines the specific Fields to log:
Duration: Time spent practicing yoga.
Type: Integer
Unit: Minutes
Type of Yoga: The style or form of yoga practiced (e.g., Hatha, Vinyasa, Ashtanga).
Type: String
Intensity: Alex's perceived exertion level during the session.
Type: FloatScale10
Scale: 1.0 (very light) to 10.0 (maximum effort)
Saving the Custom Item:

Alex saves the "Yoga Session" item with its associated fields.
The new item now appears under the Activity category in Alex's logging interface.
Logging a Yoga Session:

After completing a yoga session, Alex logs the activity by selecting "Yoga Session" from the list of activities.
Alex enters the following details:
Duration: 45 minutes
Type of Yoga: Vinyasa
Intensity: 7.5
The app automatically records the timestamp of the entry.
Reviewing Logged Data:

Alex can view and analyze logged yoga sessions over time, observing patterns in duration, types practiced, and intensity levels.

---------------------
example logging records

1. Activity: Running

Timestamp	Item	Kilometers	Minutes	Intensity	Notes
2025-02-22 07:00:00	Running	5.2	30	7.5	Morning run in the park
2. Status: Anxiety

Timestamp	Item	Level	Notes
2025-02-22 09:00:00	Anxiety	4.0	Felt slightly anxious before the meeting
3. Supplement & Medication: Vitamin D

Timestamp	Item	Dosage (IU)	Form	Notes
2025-02-22 08:00:00	Vitamin D	2000	Capsule	Taken with breakfast
4. Food: Chicken Breast

Timestamp	Item	Weight (grams)	Notes
2025-02-22 12:30:00	Chicken Breast	150	Grilled for lunch
5. Drink: Water

Timestamp	Item	Volume (deciliters)	Notes
2025-02-22 14:00:00	Water	2.5	After workout
6. Event: Dream

Timestamp	Item	Description	Emotional Tone
2025-02-22 06:30:00	Dream	Dreamt about traveling to Japan	Excitement



