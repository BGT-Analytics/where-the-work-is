var geo_hierarchy = {
    'name': 'UK Total',
    'level': 'Country',
    'children': [
        {
            'name': 'NORTHERN IRELAND',
            'level': 'Nation',
            'children': []
        },
        {
            'name': 'SCOTLAND',
            'level': 'Nation',
            'children': []
        },
        {
            'name': 'WALES',
            'level': 'Nation',
            'children': []
        },
        {
            'name': 'ENGLAND',
            'level': 'Nation',
            'children': [
                {
                    'name': 'EAST MIDLANDS',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Leicester and Leicestershire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Derby, Derbyshire, Nottingham and Nottinghamshire',
                            'level': 'LEP'
                        }

                    ]
                },
                {
                    'name': 'EAST OF ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Greater Cambridge & Greater Peterborough',
                            'level': 'LEP'
                        },
                        {
                            'name': 'New Anglia',
                            'level': 'LEP'
                        },
                        {
                            'name': 'South East',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'GREATER LONDON',
                    'level': 'Region',
                    'children': []
                },
                {
                    'name': 'NORTH EAST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'North East',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Tees Valley',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'NORTH WEST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Greater Manchester',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Lancashire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Liverpool City Region',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'SOUTH EAST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Coast to Capital',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Oxfordshire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Solent',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Thames Valley Berkshire',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'SOUTH WEST ENGLAND',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Cornwall and Isles of Scilly',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Heart of the South West',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Swindon and Wiltshire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'West of England',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'WEST MIDLANDS',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Black Country',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Coventry and Warwickshire',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Greater Birmingham and Solihull',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Stoke-on-Trent and Staffordshire',
                            'level': 'LEP'
                        }
                    ]
                },
                {
                    'name': 'YORKSHIRE AND THE HUMBER',
                    'level': 'Region',
                    'children': [
                        {
                            'name': 'Humber',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Leeds City Region',
                            'level': 'LEP'
                        },
                        {
                            'name': 'Sheffield City Region',
                            'level': 'LEP'
                        }
                    ]
                }

            ]
        }
    ]
};

var breadcrumbs = {
    "NORTHERN IRELAND":[],
    "SCOTLAND":[],
    "WALES":[],
    "ENGLAND":[],
    "EAST MIDLANDS":["ENGLAND"],
    "Leicester and Leicestershire":["ENGLAND","EAST MIDLANDS"],
    "Derby, Derbyshire, Nottingham and Nottinghamshire":["ENGLAND","EAST MIDLANDS"],
    "EAST OF ENGLAND":["ENGLAND"],
    "Greater Cambridge & Greater Peterborough":["ENGLAND","EAST OF ENGLAND"],
    "New Anglia":["ENGLAND","EAST OF ENGLAND"],
    "South East":["ENGLAND","EAST OF ENGLAND"],
    "GREATER LONDON":["ENGLAND"],
    "NORTH EAST ENGLAND":["ENGLAND"],
    "North East":["ENGLAND","NORTH EAST ENGLAND"],
    "Tees Valley":["ENGLAND","NORTH EAST ENGLAND"],
    "NORTH WEST ENGLAND":["ENGLAND"],
    "Greater Manchester":["ENGLAND","NORTH WEST ENGLAND"],
    "Lancashire":["ENGLAND","NORTH WEST ENGLAND"],
    "Liverpool City Region":["ENGLAND","NORTH WEST ENGLAND"],
    "SOUTH EAST ENGLAND":["ENGLAND"],
    "Coast to Capital":["ENGLAND","SOUTH EAST ENGLAND"],
    "Oxfordshire":["ENGLAND","SOUTH EAST ENGLAND"],
    "Solent":["ENGLAND","SOUTH EAST ENGLAND"],
    "Thames Valley Berkshire":["ENGLAND","SOUTH EAST ENGLAND"],
    "SOUTH WEST ENGLAND":["ENGLAND"],
    "Cornwall and Isles of Scilly":["ENGLAND","SOUTH WEST ENGLAND"],
    "Heart of the South West":["ENGLAND","SOUTH WEST ENGLAND"],
    "Swindon and Wiltshire":["ENGLAND","SOUTH WEST ENGLAND"],
    "West of England":["ENGLAND","SOUTH WEST ENGLAND"],
    "WEST MIDLANDS":["ENGLAND"],
    "Black Country":["ENGLAND","WEST MIDLANDS"],
    "Coventry and Warwickshire":["ENGLAND","WEST MIDLANDS"],
    "Greater Birmingham and Solihull":["ENGLAND","WEST MIDLANDS"],
    "Stoke-on-Trent and Staffordshire":["ENGLAND","WEST MIDLANDS"],
    "YORKSHIRE AND THE HUMBER":["ENGLAND"],
    "Humber":["ENGLAND","YORKSHIRE AND THE HUMBER"],
    "Leeds City Region":["ENGLAND","YORKSHIRE AND THE HUMBER"],
    "Sheffield City Region":["ENGLAND","YORKSHIRE AND THE HUMBER"]
};


var occupation_mapping = {
    "Science, Engineering and Production Technicians":{
        "short_name":"Engineering Techs",
        "description":"Science, engineering and production technicians perform a variety of technical support functions to assist the work of scientists and technologists, assist in the design, development, production and maintenance of electronic systems, perform technical quality assurance related tasks, support the work of building and civil engineers, and perform various other technical support functions for engineers.",
        "example_titles":["Quality assurance technicians","Planning, process and production technicians","Science, engineering and production technicians n.e.c."]},
    "Draughtspersons and Related Architectural Technicians":{
        "short_name":"Architectural Techs",
        "description":"Workers in this group prepare technical drawings, plans and charts and give technical assistance to planners and architects.",
        "example_titles":["Draughtspersons","Architectural and town planning technicians"]},
    "Information Technology Technicians":{
        "short_name":"IT Techs",
        "description":"Workers in this group are responsible for the day-to-day running of IT systems and networks, and provide technical support, advice and guidance for users and customers.",
        "example_titles":["IT operations technicians","IT user support technicians"]},
    "Health Associate Professionals":{
        "short_name":"Health",
        "description":"Workers in this group provide a variety of technical support functions for a range of health professionals such as administering first aid treatment in emergencies, operating x-ray and other imaging equipment, fitting hearing aids and spectacles, dispensing medicines, and fitting, servicing and repairing medical and dental devices.",
        "example_titles":["Paramedics","Dispensing opticians","Pharmaceutical technicians","Medical and dental technicians","Health associate professionals n.e.c."]},
    "Welfare and Housing Associate Professionals":{
        "short_name":"Welfare",
        "description":"Welfare and housing associate professionals organise and provide social welfare and related community services including working with children and young people, address the housing needs of individuals or localities, assist those with physical and mental disabilities or illnesses, investigate cases of abuse or neglect, provide counselling services and perform other welfare functions.",
        "example_titles":["Counsellors","Youth and community workers","Child and early years officers","Housing officers","Welfare and housing associate professionals n.e.c."]},
    "Protective Service Occupations":{
        "short_name":"Protective Service",
        "description":"Workers in this group serve in Her Majesty’s, foreign and Commonwealth armed forces, investigate crimes and maintain law and order, fight fires and advise on fire prevention, guard inmates and maintain discipline at prisons and detention centres, and perform other miscellaneous protective service roles.",
        "example_titles":["Police officers (sergeant and below)","Fire service officers (watch manager and below)","Prison service officers (below principal officer)","Protective service associate professionals n.e.c."]},
    "Artistic, Literary and Media Occupations":{
        "short_name":"Art/Media",
        "description":"Workers in this group create and restore artistic work; write, evaluate and edit literary material; translate written and spoken statements; perform in films, theatre and other acts of entertainment; write, arrange and perform musical compositions; produce, direct, present and participate in television programmes, films and stage presentations; create artistic content for various media; and promote and administer artistic and cultural activities.",
        "example_titles":["Artists","Authors, writers and translators","Actors, entertainers and presenters","Dancers and choreographers","Musicians","Arts officers, producers and directors","Photographers, audio-visual and broadcasting equipment operators"]},
    "Design Occupations":{
        "short_name":"Design",
        "description":"Workers in this group use a wide variety of design techniques to convey information for publicity, promotional and advertising purposes, and to design industrial and commercial products, clothing and fashion accessories.",
        "example_titles":["Graphic designers","Product, clothing and related designers"]},
    "Sports and Fitness Occupations":{
        "short_name":"Sports",
        "description":"Workers in this group prepare for and compete in sporting events for financial gain, train amateur and professional sportsmen and women to enhance performance, promote participation and standards in sport, organise and officiate at sporting events, and provide instruction, training and supervision for various forms of exercise and other recreational activities.",
        "example_titles":["Sports players","Sports coaches, instructors and officials","Fitness instructors"]},
    "Transport Associate Professionals":{
        "short_name":"Transport",
        "description":"Workers in this group command and navigate aircraft and vessels, perform technical functions to operate and maintain such craft, and plan and regulate the ground and air movements of aircraft.",
        "example_titles":["Air traffic controllers","Aircraft pilots and flight engineers","Ship and hovercraft officers"]},
    "Legal Associate Professionals":{
        "short_name":"Legal",
        "description":"Legal associate professionals organise the administrative work of legal practices and perform specialised legal duties.",
        "example_titles":["Legal associate professionals"]},
    "Business, Finance and Related Associate Professionals":{
        "short_name":"Business",
        "description":"Business, finance and related associate professionals calculate the probable costs of projects, assess the value of properties, underwrite insurance policies and assess liability regarding claims, deal in commodities and financial assets, advise clients on insurance, investment, taxation, mortgages, pensions and other financial matters, and assist accounting and financial professionals in managing an organisation’s financial affairs and its accounts.",
        "example_titles":["Estimators, valuers and assessors","Brokers","Insurance underwriters","Finance and investment analysts and advisers","Taxation experts","Financial accounts managers","Business and related associate professionals n.e.c.","Importers and exporters","Financial and accounting technicians"]},
    "Sales, Marketing and Related Associate Professionals":{
        "short_name":"Sales",
        "description":"Sales, marketing and related associate professionals purchase raw materials, equipment and merchandise, provide technical sales advice to customers, undertake market research, support the implementation of the organisation’s marketing and sales policies and arrange for the trading and leasing of property on behalf of clients.",
        "example_titles":["Buyers and procurement officers","Business sales executives","Marketing associate professionals","Estate agents and auctioneers; Conference and exhibition managers and organisers","Sales accounts and business development managers"]},
    "Conservation and Environmental Associate Professionals":{
        "short_name":"Environmental",
        "description":"Workers in this group are responsible for the day-to-day planning, management, promotion and maintenance of areas of the environment that are of benefit to wildlife and the public.",
        "example_titles":["Conservation and environmental associate professionals"]},
    "Public Services and Other Associate Professionals":{
        "short_name":"Public Services",
        "description":"Public services and other associate professionals supervise, manage and undertake general administrative functions in national and local government, advise upon and undertake recruitment, staff appraisal and industrial relations activities, give advice regarding careers, training and related opportunities, provide vocational training, undertake inspections and investigations to ensure statutory compliance, implement health and safety measures within establishments and organisations, and undertake inspections to ensure compliance with environmental health regulations.",
        "example_titles":["Human resources and industrial relations officers","Vocational and industrial trainers and instructors","Inspectors of standards and regulations","Health and safety officers","Public services associate professionals","Careers advisers and vocational guidance specialists"]},
    "Administrative Occupations: Finance":{
        "short_name":"Finance Admin",
        "description":"Workers in this group perform administrative and other tasks in relation to credit control and debt collection, the maintenance of financial records within firms, financial transactions made with customers and the collection of payments from businesses and households.",
        "example_titles":["Book-keepers, payroll managers and wages clerks","Bank and post office clerks","Credit controllers","Finance officers","Financial administrative occupations n.e.c."]},
    "Administrative Occupations: Records":{
        "short_name":"Records Admin",
        "description":"Workers in this group create, maintain, update and file correspondence, data, documents and information held both in hard copy and electronically for storage, reference purposes and despatch.",
        "example_titles":["Records clerks and assistants","Pensions and insurance clerks and assistants","Stock control clerks and assistants","Transport and distribution clerks and assistants","Library clerks and assistants","Human resources administrative occupations"]},
    "Administrative Occupations: Office Managers and Supervisors":{
        "short_name":"Office Admin",
        "description":"Workers in this group coordinate the day-to-day running of offices providing the administrative services of commercial, industrial and other non-governmental organisations and public agencies, and supervise the staff within those offices.",
        "example_titles":["Office managers","Office supervisors"]},
    "Secretarial and Related Occupations":{
        "short_name":"Secretarial",
        "description":"Workers in this group provide dictation services, type, edit and print documents, perform general clerical and organisational duties in support of management or other workers, and receive and direct clients and visitors to commercial, government and other establishments.",
        "example_titles":["Medical secretaries","Legal secretaries","Company secretaries","Personal assistants and other secretaries","Receptionists","Typists and related keyboard occupations","School secretaries"]},
    "Agricultural and Related Trades":{
        "short_name":"Agricultural",
        "description":"Those working in agricultural and related trades occupations cultivate crops and raise animals for consumption, grow plants, trees, shrubs and flowers for sale, tend private and public gardens, parks, sports pitches and other recreational areas, and perform a variety of other skilled occupations related to agriculture and fishing.",
        "example_titles":["Farmers","Horticultural trades","Gardeners and landscape gardeners","Groundsmen and greenkeepers","Agricultural and fishing trades n.e.c."]},
    "Metal Forming, Welding and Related Trades":{
        "short_name":"Metal Forming",
        "description":"Metal forming, welding and related trades workers shape, cast, finish and join metal, and erect, install, maintain and repair metal structures and fixtures.",
        "example_titles":["Smiths and forge workers","Moulders, core makers and die casters","Sheet metal workers","Welding trades","Pipe fitters","Metal plate workers, and riveters"]},
    "Metal Machining, Fitting and Instrument Making Trades":{
        "short_name":"Metal Machining",
        "description":"Metal machining, fitting and instrument making trades workers mark out metal for machine tool working, set up and operate lathes, boring, drilling, grinding, milling machines and presses, assemble and repair machine tools, install and repair plant and industrial machinery, fix and assemble parts and sub-assemblies in the manufacture of metal products, make, calibrate, test and repair precision and optical instruments, and install and repair air-conditioning and refrigeration systems.",
        "example_titles":["Metal machining setters and setter-operators","Tool makers, tool fitters and markers-out","Metal working production and maintenance fitters","Air-conditioning and refrigeration engineers","Precision instrument makers and repairers"]},
    "Vehicle Trades":{
        "short_name":"Vehicle",
        "description":"Vehicle trades workers repair, service and maintain the bodies, engines, parts, sub-assemblies, internal trimmings, upholstery and exterior surfaces of vehicles.",
        "example_titles":["Vehicle technicians, mechanics and electricians","Vehicle body builders and repairers ","Vehicle paint technicians","Aircraft maintenance and related trades","Boat and ship builders and repairers","Rail and rolling stock builders and repairers"]},
    "Electrical and Electronic Trades":{
        "short_name":"Electrical/Electronic",
        "description":"Workers in electrical and electronic trades install wiring in road and rail vehicles and aircraft and assemble, install, maintain, test and repair electrical and electronic equipment, components and systems concerned with lighting, signalling, telecommunications, radio and television and other commercial, industrial and domestic functions.",
        "example_titles":["Electricians and electrical fitters","Telecommunications engineers","TV, video and audio engineers","IT engineers","Electrical and electronic trades n.e.c."]},
    "Skilled Metal, Electrical and Electronic Trades Supervisors":{
        "short_name":"Metal Supvrs",
        "description":"Jobholders in this group supervise and control technical and operational aspects of metal forming, welding and relate, metal machining, fitting and instrument making, vehicles trades and electrical and electronic trades.",
        "example_titles":["Skilled metal, electrical and electronic trades supervisors"]},
    "Construction and Building Trades":{
        "short_name":"Construction",
        "description":"Jobholders within construction and building trades erect and fit metal framework for building construction, cut, shape and lay stone, brick and similar materials, cover roofs and exterior walls, install, maintain and repair plumbing, heating and ventilating systems, construct and install wooden frameworks and fittings, fi glass into windows and doors, and perform other miscellaneous construction tasks.",
        "example_titles":["Bricklayers and masons","Roofers, roof tilers and slaters","Plumbers and heating and ventilating engineers","Carpenters and joiners","Glaziers, window fabricators and fitters","Construction and building trades n.e.c.","Steel erectors"]},
    "Building Finishing Trades":{
        "short_name":"Building Finishing",
        "description":"Workers in this group apply plaster and cement mixtures to walls and ceilings, lay flooring covers and apply paint, varnish, wallpaper, tiles and other protective and decorative materials to walls and ceilings.",
        "example_titles":["Plasterers","Floorers and wall tilers","Painters and decorators"]},
    "Construction and Building Trades Supervisors":{
        "short_name":"Construction Supvrs",
        "description":"Workers in this group supervise and control technical and operational aspects of Construction and Building, and Building Finishing Trades.",
        "example_titles":["Construction and building trades supervisors"]},
    "Textiles and Garments Trades":{
        "short_name":"Textiles",
        "description":"Workers within textiles and garments trades weave fabrics into fire and carpet, knit garments from yarn, upholster the seating and interior of vehicles and planes, make soft furnishings, make, repair and finish leather goods, and make, fi and alter tailored articles of clothing.",
        "example_titles":["Weavers and knitters","Upholsterers","Footwear and leather working trades","Tailors and dressmakers","Textiles, garments and related trades n.e.c."]},
    "Printing Trades":{
        "short_name":"Printing",
        "description":"Printing trades workers compose and set type and printing blocks, produce printing plates, cylinders and film, operate printing machines and bind the finished printed product.",
        "example_titles":["Pre-press technicians","Printers","Print finishing and binding workers"]},
    "Food Preparation and Hospitality Trades":{
        "short_name":"Hospitality",
        "description":"Workers in food preparation and hospitality trades slaughter livestock, cut, trim and prepare meat, poultry and fish, prepare, bake and finish bread and flour confectionery products, prepare food in hotels, restaurants and other establishments, and manage the catering and bar facilities in factories, shops, theatres, educational premises and similar establishments.",
        "example_titles":["Butchers","Bakers and flour confectioners","Chefs","Cooks","Fishmongers and poultry dressers","Catering and bar managers"]},
    "Other Skilled Trades":{
        "short_name":"Other Skilled Trades",
        "description":"Workers in this unit group perform a variety of other skilled craft and related trades.",
        "example_titles":["Glass and ceramics makers, decorators and finishers","Furniture makers and other craft woodworkers","Florists","Other skilled trades n.e.c."]},
    "Childcare and Related Personal Services":{
        "short_name":"Childcare",
        "description":"Workers in childcare and related personal services supervise play and other activities for pre-school age children, assist teachers and care for children in day or residential nurseries, children’s homes and private households.",
        "example_titles":["Nursery nurses and assistants","Childminders and related occupations","Teaching assistants","Playworkers","Educational support assistants"]},
    "Animal Care and Control Services":{
        "short_name":"Animal Care",
        "description":"Workers in this group provide assistance to veterinarians, carry out pest control services, care for animals in stables, kennels, zoos and other such establishments, provide specialised grooming and clipping services for animals and capture stray or unruly dogs.",
        "example_titles":["Veterinary nurses","Pest control officers","Animal care services occupations n.e.c."]},
    "Caring Personal Services":{
        "short_name":"Personal Care",
        "description":"Those working in caring personal services occupations transport patients by ambulance, stretcher, wheelchair or other means and assist health professionals with the care of patients in hospitals, dental surgeries, nursing homes, residential homes, clinics, day care services and within the home.",
        "example_titles":["Nursing auxiliaries and assistants","Ambulance staff (excluding paramedics)","Dental nurses","Care workers and home carers","Senior care workers","Care escorts","Undertakers, mortuary and crematorium assistants","Houseparents and residential wardens"]}
}

